import { LicenseDetails } from '../../domain/license-details';
import { ccPublicDomain } from './license-wizard-list';

export interface Step {
  readonly question?: string;
  readonly answers?: Answer[];
}

export interface Answer {
  label: string;
  next: {
    step: (steps: Iterable<LicenseDetails>, option?: string) => Step;
    filter?: Filter;
  };
}

export interface Filter {
  readonly licenses?: LicenseDetails[];
  readonly include?: string[];
  readonly exclude?: string[];
}

const end: Step = {};
// Software

const strongCopyleft: Step = {
  question: 'license-wizard.question.strongCopyleft',
  answers: [
    {
      label: 'license-wizard.answer.executable',
      next: {
        step() {
          return end;
        },
        filter: { include: ['strong'] },
      },
    },
    {
      label: 'license-wizard.answer.library',
      next: {
        step() {
          return end;
        },
        filter: { include: ['weak'] },
      },
    },
  ],
};

const copyleft: Step = {
  question: 'license-wizard.question.copyleft',
  answers: [
    {
      label: 'yes',
      next: {
        step(list: LicenseDetails[]) {
          if (has(list, 'weak') && has(list, 'strong')) {
            return strongCopyleft;
          }
          return end;
        },
        filter: { include: ['copyleft'] },
      },
    },
    {
      label: 'no',
      next: {
        step() {
          return end;
        },
        filter: { include: ['permissive'], exclude: ['copyleft'] },
      },
    },
  ],
};

const licenseInteropSoftware: Step = {
  question: 'license-wizard.question.licenseInteropSoftware',
  answers: [
    {
      label: 'license-wizard.answer.next',
      next: {
        step(list: LicenseDetails[]) {
          if (has(list, 'copyleft') && has(list, 'permissive')) {
            return copyleft;
          } else if (
            has(list, 'copyleft') &&
            has(list, 'strong') &&
            has(list, 'weak')
          ) {
            return strongCopyleft;
          }
          return end;
        },
      },
    },
  ],
};

const software: Step = {
  question: 'license-wizard.question.software',
  answers: [
    {
      label: 'license-wizard.answer.licenseInteropSoftware',
      next: {
        step() {
          return licenseInteropSoftware;
        },
      },
    },
    {
      label: 'license-wizard.answer.copyleft',
      next: {
        step() {
          return copyleft;
        },
      },
    },
  ],
};

// Data

const decideAttributes: Step = {
  question: 'license-wizard.question.decideAttributes',
  answers: [
    {
      label: 'yes',
      next: {
        step() {
          return end;
        },
        filter: { include: ['by'] },
      },
    },
    {
      label: 'no',
      next: {
        step() {
          return end;
        },
        filter: { include: ['public-domain'] },
      },
    },
  ],
};

const commercialUse: Step = {
  question: 'license-wizard.question.commercialUse',
  answers: [
    {
      label: 'yes',
      next: {
        step(list: LicenseDetails[]) {
          if (only(list, 'by')) {
            return end;
          }
          return decideAttributes;
        },
        filter: { exclude: ['nc'] },
      },
    },
    {
      label: 'no',
      next: {
        step() {
          return end;
        },
        filter: { include: ['nc', 'by'] },
      },
    },
  ],
};

const shareAlike: Step = {
  question: 'license-wizard.question.shareAlike',
  answers: [
    {
      label: 'yes',
      next: {
        step(list: LicenseDetails[]) {
          if (only(list, 'nc')) {
            return end;
          }
          return commercialUse;
        },
        filter: { include: ['sa'] },
      },
    },
    {
      label: 'no',
      next: {
        step(list: LicenseDetails[]) {
          if (only(list, 'nc')) {
            return end;
          }
          return commercialUse;
        },
        filter: { exclude: ['sa'] },
      },
    },
  ],
};

const allowDerivativeWorks: Step = {
  question: 'license-wizard.question.allowDerivativeWorks',
  answers: [
    {
      label: 'yes',
      next: {
        step() {
          return shareAlike;
        },
        filter: { exclude: ['nd'] },
      },
    },
    {
      label: 'no',
      next: {
        step(list: LicenseDetails[]) {
          if (only(list, 'nc')) {
            return end;
          }
          return commercialUse;
        },
        filter: { include: ['nd'] },
      },
    },
  ],
};

const licenseInteropData: Step = {
  question: 'license-wizard.question.licenseInteropData',
  answers: [
    {
      label: 'license-wizard.answer.next',
      next: {
        step(list: LicenseDetails[], option: string) {
          if (option === 'cantLicense') {
            return cantLicense;
          } else if (option === 'end') {
            return end;
          }
          return allowDerivativeWorks;
        },
      },
    },
  ],
};

const cantLicense: Step = {
  question: 'license-wizard.question.cantLicense',
};

const ensureLicensing: Step = {
  question: 'license-wizard.question.ensureLicensing',
  answers: [
    {
      label: 'yes',
      next: {
        step() {
          return licenseInteropData;
        },
      },
    },
    {
      label: 'no',
      next: {
        step() {
          return cantLicense;
        },
        filter: { licenses: [] },
      },
    },
  ],
};

const ownIPR: Step = {
  question:
    'Do you own copyright and similar rights in your dataset and all its constitutive parts?',
  answers: [
    {
      label: 'yes',
      next: {
        step() {
          return allowDerivativeWorks;
        },
      },
    },
    {
      label: 'no',
      next: {
        step() {
          return ensureLicensing;
        },
      },
    },
  ],
};

const data: Step = {
  question: 'license-wizard.question.data',
  answers: [
    {
      label: 'yes',
      next: {
        step() {
          return ownIPR;
        },
      },
    },
    {
      label: 'no',
      next: {
        step() {
          return end;
        },
        filter: { licenses: [ccPublicDomain] },
      },
    },
  ],
};

const root: Step = {
  question: 'license-wizard.question.root',
  answers: [
    {
      label: 'license-wizard.answer.software',
      next: {
        step() {
          return software;
        },
        filter: { exclude: ['data'] },
      },
    },
    {
      label: 'license-wizard.answer.data',
      next: {
        step() {
          return data;
        },
        filter: { exclude: ['software'] },
      },
    },
  ],
};

export const QUESTION_TREE = root;

function has(list: LicenseDetails[], category: string): boolean {
  return list.some(license => license.categories.includes(category));
}

function only(list: LicenseDetails[], category: string): boolean {
  return list.every(license => license.categories.includes(category));
}
