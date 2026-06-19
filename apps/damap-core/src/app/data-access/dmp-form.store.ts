import { computed, Injectable, signal } from '@angular/core';

import { Dmp } from '../domain/dmp';

function initialDmp(): Dmp {
  return {
    closedAccessInfo: '',
    committeeReviewed: false,
    committeeReviewedCris: undefined,
    contributors: [],
    costs: [],
    costsExist: null,
    costsExistCris: undefined,
    dataGeneration: '',
    dataKind: null,
    dataQuality: [],
    datasets: [],
    documentation: '',
    ethicalIssuesExist: false,
    ethicalIssuesExistCris: undefined,
    externalStorage: [],
    externalStorageInfo: '',
    repositories: [],
    humanParticipants: false,
    humanParticipantsCris: undefined,
    legalRestrictions: false,
    legalRestrictionsCris: undefined,
    legalRestrictionsDocuments: [],
    otherLegalRestrictionsDocument: '',
    legalRestrictionsComment: '',
    dataRightsAndAccessControl: '',
    metadata: '',
    noDataExplanation: '',
    otherPersonalDataCompliance: '',
    personalData: false,
    personalDataCris: undefined,
    personalDataCompliance: [],
    restrictedAccessInfo: '',
    restrictedDataAccess: '',
    reusedDataKind: null,
    sensitiveData: false,
    sensitiveDataCris: undefined,
    sensitiveDataSecurity: [],
    otherDataQuality: '',
    otherDataSecurityMeasures: '',
    sensitiveDataAccess: '',
    storage: [],
    structure: '',
    targetAudience: '',
    tools: '',
    id: null,
    project: null,
    ethicalIssuesReport: '',
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function equals(a: unknown, b: unknown): boolean {
  if (a == null || b == null) {
    return a === b;
  }

  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(key => equals(a[key], b[key]));
}

@Injectable()
export class DmpFormStore {
  private readonly dmpState = signal<Dmp>(initialDmp());
  private readonly changedState = signal<boolean | undefined>(undefined);

  readonly dmp = this.dmpState.asReadonly();
  readonly changed = this.changedState.asReadonly();
  readonly contact = computed(() =>
    this.dmpState().contributors?.find(contributor => contributor.contact),
  );

  setFormValue(dmp: Dmp): void {
    this.dmpState.set(dmp);
    this.changedState.set(false);
  }

  formDiff(newDmp: Dmp): void {
    this.changedState.set(!equals(this.dmpState(), newDmp));
  }

  reset(): void {
    this.dmpState.set(initialDmp());
    this.changedState.set(undefined);
  }
}
