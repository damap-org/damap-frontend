import { Contributor, compareContributors } from '../domain/contributor';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { AccessRight } from '../domain/enum/access-right.enum';
import { Cost } from '../domain/cost';
import { CostType } from '../domain/enum/cost-type.enum';
import { DataAccessType } from '../domain/enum/data-access-type.enum';
import { DataSource } from '../domain/enum/data-source.enum';
import { Dataset } from '../domain/dataset';
import { Dmp } from '../domain/dmp';
import { ExternalStorage } from '../domain/external-storage';
import { Injectable } from '@angular/core';
import { InternalStorage } from '../domain/internal-storage';
import { Repository } from '../domain/repository';
import { Storage } from '../domain/storage';
import { ccBy } from '../widgets/license-wizard/license-wizard-list';
import { currencyValidator } from '../validators/currency.validator';
import { notEmptyValidator } from '../validators/not-empty.validator';
import { uriValidator } from '../validators/uri.validator';
import { urlValidator } from '../validators/url.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private TEXT_MAX_LENGTH = 4000;
  private TEXT_SHORT_LENGTH = 255;
  private readonly DEFAULT_BANNER_COLOR = '#E6F3FF';
  private readonly form: UntypedFormGroup;
  private readonly initialFormValue;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form = this.createDmpForm();
    this.initialFormValue = this.form.getRawValue();
  }

  get dmpForm(): UntypedFormGroup {
    return this.form;
  }

  public static restrictedDatasets(datasets: Dataset[]): boolean {
    return (
      datasets.find(item => item.dataAccess === DataAccessType.RESTRICTED) !=
      null
    );
  }

  public static closedDatasets(datasets: Dataset[]): boolean {
    return (
      datasets.find(item => item.dataAccess === DataAccessType.CLOSED) != null
    );
  }

  private createDmpForm(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null],
      project: [null],
      funding: [null],
      contributors: this.formBuilder.array([]),
      data: this.formBuilder.group({
        kind: [null],
        explanation: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        reusedKind: [null],
        dataGeneration: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      }),
      datasets: this.formBuilder.array([]),
      documentation: this.formBuilder.group({
        metadata: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        structure: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        documentation: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        dataQuality: [[]],
        otherDataQuality: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      }),
      storage: this.formBuilder.array([]),
      externalStorage: this.formBuilder.array([]),
      externalStorageInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      legal: this.formBuilder.group({
        personalData: [false],
        personalDataCris: [null],
        personalDataCompliance: [[]],
        otherPersonalDataCompliance: [
          '',
          Validators.maxLength(this.TEXT_MAX_LENGTH),
        ],
        sensitiveData: [false],
        sensitiveDataCris: [null],
        sensitiveDataSecurity: [[]],
        otherDataSecurityMeasures: [
          '',
          Validators.maxLength(this.TEXT_MAX_LENGTH),
        ],
        sensitiveDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        legalRestrictions: [false],
        legalRestrictionsCris: [null],
        legalRestrictionsDocuments: [[]],
        otherLegalRestrictionsDocuments: [
          '',
          Validators.maxLength(this.TEXT_MAX_LENGTH),
        ],
        legalRestrictionsComment: [
          '',
          Validators.maxLength(this.TEXT_MAX_LENGTH),
        ],
        dataRightsAndAccessControl: [
          '',
          Validators.maxLength(this.TEXT_MAX_LENGTH),
        ],
        humanParticipants: [false],
        humanParticipantsCris: [null],
        ethicalIssues: [false],
        ethicalIssuesCris: [null],
        committeeReviewed: [false],
        committeeReviewedCris: [null],
        ethicalIssuesReport: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      }),
      repositories: this.formBuilder.array([]),
      reuse: this.formBuilder.group({
        targetAudience: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        tools: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
        restrictedDataAccess: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      }),
      restrictedAccessInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      closedAccessInfo: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      costs: this.formBuilder.group({
        exist: [null],
        existCris: [null],
        list: this.formBuilder.array([]),
      }),
    });
  }

  public mapDmpToForm(dmp: Dmp) {
    this.resetForm();
    this.form.patchValue({
      id: dmp.id,
      project: dmp.project,
      funding: dmp.project?.funding,
      data: {
        kind: dmp.dataKind,
        reusedKind: dmp.reusedDataKind,
        explanation: dmp.noDataExplanation,
        dataGeneration: dmp.dataGeneration,
      },
      documentation: {
        metadata: dmp.metadata,
        structure: dmp.structure,
        documentation: dmp.documentation,
        dataQuality: dmp.dataQuality,
        otherDataQuality: dmp.otherDataQuality,
      },
      externalStorageInfo: dmp.externalStorageInfo,
      legal: {
        personalData: dmp.personalData,
        personalDataCris: dmp.personalDataCris,
        personalDataCompliance: dmp.personalDataCompliance,
        otherPersonalDataCompliance: dmp.otherPersonalDataCompliance,
        sensitiveData: dmp.sensitiveData,
        sensitiveDataCris: dmp.sensitiveDataCris,
        sensitiveDataSecurity: dmp.sensitiveDataSecurity,
        otherDataSecurityMeasures: dmp.otherDataSecurityMeasures,
        sensitiveDataAccess: dmp.sensitiveDataAccess,
        legalRestrictions: dmp.legalRestrictions,
        legalRestrictionsCris: dmp.legalRestrictionsCris,
        legalRestrictionsDocuments: dmp.legalRestrictionsDocuments,
        otherLegalRestrictionsDocuments: dmp.otherLegalRestrictionsDocument,
        legalRestrictionsComment: dmp.legalRestrictionsComment,
        dataRightsAndAccessControl: dmp.dataRightsAndAccessControl,
        humanParticipants: dmp.humanParticipants,
        humanParticipantsCris: dmp.humanParticipantsCris,
        ethicalIssues: dmp.ethicalIssuesExist,
        ethicalIssuesCris: dmp.ethicalIssuesExistCris,
        committeeReviewed: dmp.committeeReviewed,
        committeeReviewedCris: dmp.committeeReviewedCris,
        ethicalIssuesReport: dmp.ethicalIssuesReport,
      },
      reuse: {
        targetAudience: dmp.targetAudience,
        tools: dmp.tools,
        restrictedDataAccess: dmp.restrictedDataAccess,
      },
      costs: {
        exist: dmp.costsExist,
        existCris: dmp.costsExistCris,
      },
      restrictedAccessInfo: dmp.restrictedAccessInfo,
      closedAccessInfo: dmp.closedAccessInfo,
    });

    // Contributors, datasets, repositories, costs
    for (const contributor of dmp.contributors || []) {
      (this.form.controls['contributors'] as UntypedFormArray).push(
        this.mapContributorToFormGroup(contributor),
      );
    }
    for (const dataset of dmp.datasets || []) {
      (this.form.controls['datasets'] as UntypedFormArray).push(
        this.mapDatasetToFormGroup(dataset),
      );
    }
    for (const repo of dmp.repositories || []) {
      (this.form.controls['repositories'] as UntypedFormArray).push(
        this.mapRepositoryToFormGroup(repo),
      );
    }
    for (const cost of dmp.costs || []) {
      (this.form.controls['costs'].get('list') as UntypedFormArray).push(
        this.mapCostToFormGroup(cost),
      );
    }
    for (const storage of dmp.storage || []) {
      (this.form.controls['storage'] as UntypedFormArray).push(
        this.mapStorageToFormGroup(storage),
      );
    }
    for (const externalStorage of dmp.externalStorage || []) {
      (this.form.controls['externalStorage'] as UntypedFormArray).push(
        this.mapExternalStorageToFormGroup(externalStorage),
      );
    }
  }

  public exportFormToDmp(): Dmp {
    const formValue = this.form.getRawValue();

    return {
      closedAccessInfo: formValue.closedAccessInfo,
      committeeReviewed: formValue.legal.committeeReviewed,
      committeeReviewedCris: formValue.legal.committeeReviewedCris,
      contributors: formValue.contributors,
      costs: formValue.costs.exist
        ? formValue.costs.list.map(this.mapFormGroupToCost)
        : [],
      costsExist: formValue.costs.exist,
      costsExistCris: formValue.costs.existCris,
      dataGeneration: formValue.data.dataGeneration,
      dataKind: formValue.data.kind,
      reusedDataKind: formValue.data.reusedKind,
      dataQuality: formValue.documentation.dataQuality || [],
      documentation: formValue.documentation.documentation,
      datasets: formValue.datasets.map(this.setStartDateToNullWhenClosed),
      ethicalIssuesExist: formValue.legal.ethicalIssues,
      ethicalIssuesExistCris: formValue.legal.ethicalIssuesCris,
      externalStorage: formValue.externalStorage,
      externalStorageInfo: formValue.externalStorageInfo,
      repositories: formValue.repositories,
      humanParticipants: formValue.legal.humanParticipants,
      humanParticipantsCris: formValue.legal.humanParticipantsCris,
      legalRestrictions: formValue.legal.legalRestrictions,
      legalRestrictionsCris: formValue.legal.legalRestrictionsCris,
      legalRestrictionsDocuments:
        formValue.legal.legalRestrictionsDocuments || [],
      otherLegalRestrictionsDocument:
        formValue.legal.otherLegalRestrictionsDocuments,
      legalRestrictionsComment: formValue.legal.legalRestrictionsComment,
      dataRightsAndAccessControl: formValue.legal.dataRightsAndAccessControl,
      metadata: formValue.documentation.metadata,
      noDataExplanation: formValue.data.explanation,
      otherDataQuality: formValue.documentation.otherDataQuality,
      otherPersonalDataCompliance: formValue.legal.otherPersonalDataCompliance,
      personalData: formValue.legal.personalData,
      personalDataCris: formValue.legal.personalDataCris,
      personalDataCompliance: formValue.legal.personalDataCompliance || [],
      restrictedAccessInfo: formValue.restrictedAccessInfo,
      restrictedDataAccess: formValue.reuse.restrictedDataAccess,
      sensitiveData: formValue.legal.sensitiveData,
      sensitiveDataCris: formValue.legal.sensitiveDataCris,
      sensitiveDataSecurity: formValue.legal.sensitiveDataSecurity || [],
      otherDataSecurityMeasures: formValue.legal.otherDataSecurityMeasures,
      sensitiveDataAccess: formValue.legal.sensitiveDataAccess,
      storage: formValue.storage,
      structure: formValue.documentation.structure,
      targetAudience: formValue.reuse.targetAudience,
      tools: formValue.reuse.tools,
      id: formValue.id,
      project: formValue.project,
      ethicalIssuesReport: formValue.legal.ethicalIssuesReport,
    };
  }

  public resetForm(): void {
    this.form.reset();
    (this.form.controls['contributors'] as UntypedFormArray).clear();
    (this.form.controls['datasets'] as UntypedFormArray).clear();
    (this.form.controls['repositories'] as UntypedFormArray).clear();
    (this.form.controls['costs'].get('list') as UntypedFormArray).clear();
    (this.form.controls['storage'] as UntypedFormArray).clear();
    (this.form.controls['externalStorage'] as UntypedFormArray).clear();

    this.form.setValue(this.initialFormValue);
  }

  public changeContactPerson(contact: Contributor) {
    // Remove old contact
    const contributorFormArray = this.form.get(
      'contributors',
    ) as UntypedFormArray;
    contributorFormArray.controls.forEach(c =>
      c.patchValue({ contact: false }),
    );

    // Add/set new contact
    if (contact) {
      const existingContact = contributorFormArray.controls.find(c =>
        compareContributors(c.value, contact),
      );
      if (existingContact) {
        existingContact.patchValue({ contact: true });
      } else {
        this.addContributorToForm(contact, true);
      }
    }
  }

  public addContributorToForm(contributor: Contributor, contact = false) {
    contributor.contact = contact;
    const contributorFormGroup = this.mapContributorToFormGroup(contributor);
    (this.form.get('contributors') as UntypedFormArray).push(
      contributorFormGroup,
    );
  }

  public removeContributorFromForm(index: number) {
    (this.form.get('contributors') as UntypedFormArray).removeAt(index);
  }

  public upadteContributorOfForm(index: number, contributor: Contributor) {
    const contributor_ = (this.form.get('contributors') as UntypedFormArray).at(
      index,
    );

    contributor_.patchValue(contributor);
  }

  public addDatasetToForm(dataset: Dataset) {
    dataset.startDate = this.getStartDate();

    const formGroup = this.mapDatasetToFormGroup(dataset);

    (this.form.get('datasets') as UntypedFormArray).push(formGroup);
  }

  public updateDatasetOfForm(index: number, update: Dataset) {
    const dataset = (this.form.get('datasets') as UntypedFormArray).at(index);
    dataset.patchValue(update);

    const technicalResourceArray = dataset.get(
      'technicalResources',
    ) as FormArray;
    technicalResourceArray.clear();
    update.technicalResources?.forEach(resource => {
      technicalResourceArray.push(this.createTechnicalResource(resource.name));
    });
  }

  public removeDatasetFromForm(index: number) {
    this.removeDatasetReferences(index);
    (this.form.get('datasets') as UntypedFormArray).removeAt(index);
  }

  public addStorageToForm(storage: InternalStorage) {
    const storageFormGroup = this.createStorageFormGroup();

    if (storage.translations.length === 0) {
      return;
    }

    const translation = storage.translations.find(
      t => t.languageCode === 'eng',
    );
    const title: string = translation
      ? translation.title
      : storage.translations[0].title;

    storageFormGroup.patchValue({
      internalStorageId: storage.id,
      title: title,
    });
    (this.form.get('storage') as UntypedFormArray).push(storageFormGroup);
  }

  public removeStorageFromForm(index: number) {
    (this.form.get('storage') as UntypedFormArray).removeAt(index);
  }

  public addExternalStorageToForm() {
    const externalStorageFormGroup = this.createExternalStorageFormGroup();
    const storage = this.form.get('externalStorage') as UntypedFormArray;
    storage.push(externalStorageFormGroup);
  }

  public removeExternalStorageFromForm(index: number) {
    const storage = this.form.get('externalStorage') as UntypedFormArray;
    storage.removeAt(index);
  }

  public addRepositoryToForm(repo: { id: string; name: string }) {
    const repoFormGroup = this.createRepositoryFormGroup();
    repoFormGroup.patchValue({
      repositoryId: repo.id,
      title: repo.name,
    });
    (this.form.get('repositories') as UntypedFormArray).push(repoFormGroup);
  }

  public removeRepositoryFromForm(index: number) {
    (this.form.get('repositories') as UntypedFormArray).removeAt(index);
  }

  public addCostToForm() {
    const costFormGroup: UntypedFormGroup = this.createCostFormGroup();
    (
      (this.form.get('costs') as UntypedFormGroup).get(
        'list',
      ) as UntypedFormArray
    ).push(costFormGroup);
  }

  public removeCostFromForm(index: number) {
    (
      (this.form.get('costs') as UntypedFormGroup).get(
        'list',
      ) as UntypedFormArray
    ).removeAt(index);
  }

  public createDatasetFormGroup(title: string): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      title: [
        title,
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      license: [null],
      startDate: [null],
      type: [[]],
      fileFormat: [''],
      size: [null],
      description: [''],
      personalData: [false],
      sensitiveData: [false],
      legalRestrictions: [false],
      dataAccess: [DataAccessType.OPEN],
      referenceHash: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      selectedProjectMembersAccess: [AccessRight.WRITE],
      otherProjectMembersAccess: [AccessRight.READ],
      publicAccess: [AccessRight.NONE],
      delete: [false],
      dateOfDeletion: [null],
      reasonForDeletion: ['', Validators.maxLength(this.TEXT_MAX_LENGTH)],
      deletionPerson: [null],
      retentionPeriod: [10],
      source: [DataSource.NEW, Validators.required],
      datasetId: [null],
      technicalResources: this.formBuilder.array([]),
    });
  }

  public createTechnicalResource(name = ''): UntypedFormGroup {
    return this.formBuilder.group({
      name: [
        name,
        [
          Validators.required,
          notEmptyValidator(),
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
        ],
      ],
      description: [''],
    });
  }

  public createInternalStorageFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      url: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      storageLocation: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      backupLocation: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      active: [true],
    });
  }

  public createBannerFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      dismissible: [true],
      color: [
        this.DEFAULT_BANNER_COLOR,
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
    });
  }

  public createInternalStorageTranslationFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      storageId: [null, { disabled: true }],
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      languageCode: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      description: ['', [Validators.maxLength(this.TEXT_MAX_LENGTH)]],
      backupFrequency: ['', [Validators.maxLength(this.TEXT_SHORT_LENGTH)]],
    });
  }

  public presetStartDateOnDatasets() {
    if (this.form.value.project?.end || null) {
      const startDate = new Date(this.form.value.project.end);
      startDate.setMonth(startDate.getMonth() - 2);
      const datasets = this.form.get('datasets') as UntypedFormArray;
      for (let i = 0; i < datasets.length; i++) {
        if (datasets.at(i).value.startDate == null) {
          datasets.at(i).patchValue({
            startDate: startDate,
          });
        }
      }
    }
  }

  public mapDatasetToFormGroup(dataset: Dataset): UntypedFormGroup {
    const formGroup = this.createDatasetFormGroup(dataset.title);
    formGroup.patchValue(dataset);

    const technicalResourceArray = formGroup.get(
      'technicalResources',
    ) as FormArray;
    technicalResourceArray.clear();
    dataset.technicalResources?.forEach(resource => {
      technicalResourceArray.push(this.createTechnicalResource(resource.name));
    });

    return formGroup;
  }

  private createContributorFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      affiliation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      affiliationId: [null],
      contact: [false],
      firstName: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      lastName: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      mbox: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      personId: [null],
      roleInProject: [''],
      universityId: [null],
      roles: new UntypedFormControl([]),
    });
  }

  private mapContributorToFormGroup(
    contributor: Contributor,
  ): UntypedFormGroup {
    const formGroup = this.createContributorFormGroup();

    formGroup.patchValue({
      ...contributor,
      roles: contributor.roles || [],
    });

    return formGroup;
  }

  private createStorageFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      internalStorageId: [null, { disabled: true }],
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      datasets: [[]],
    });
  }

  private mapStorageToFormGroup(storage: Storage): UntypedFormGroup {
    const formGroup = this.createStorageFormGroup();
    formGroup.patchValue({
      id: storage.id,
      internalStorageId: storage.internalStorageId,
      title: storage.title,
      datasets: storage.datasets || [],
    });
    return formGroup;
  }

  private createExternalStorageFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      title: [
        'Other',
        [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      ],
      url: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      storageLocation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      backupLocation: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      backupFrequency: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      datasets: [[]],
      isManagedInternally: [false],
    });
  }

  private mapExternalStorageToFormGroup(
    externalStorage: ExternalStorage,
  ): UntypedFormGroup {
    const formGroup = this.createExternalStorageFormGroup();
    formGroup.setValue({
      id: externalStorage.id,
      title: externalStorage.title,
      url: externalStorage.url || null,
      storageLocation: externalStorage.storageLocation || null,
      backupLocation: externalStorage.backupLocation || null,
      backupFrequency: externalStorage.backupFrequency || null,
      datasets: externalStorage.datasets || [],
      isManagedInternally: externalStorage.isManagedInternally || false,
    });
    return formGroup;
  }

  private createRepositoryFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: [null, { disabled: true }],
      repositoryId: [null],
      title: ['', Validators.maxLength(this.TEXT_SHORT_LENGTH)],
      datasets: [[]],
    });
  }

  private mapRepositoryToFormGroup(repo: Repository): UntypedFormGroup {
    const formGroup = this.createRepositoryFormGroup();
    formGroup.patchValue({
      id: repo.id,
      repositoryId: repo.repositoryId,
      title: repo.title || '',
      datasets: repo.datasets || [],
    });
    return formGroup;
  }

  private createCostFormGroup(): UntypedFormGroup {
    return this.formBuilder.group({
      id: new FormControl<number>({ value: null, disabled: true }),
      title: new FormControl<string>('New cost', {
        validators: [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
          notEmptyValidator(),
        ],
      }),
      currencyCode: new FormControl<string>('EUR', {
        validators: [
          Validators.required,
          Validators.maxLength(this.TEXT_SHORT_LENGTH),
        ],
      }),
      value: new FormControl<number>(0, { validators: [currencyValidator()] }),
      type: new FormControl<CostType>(null),
      customType: new FormControl<string>('', {
        validators: Validators.maxLength(this.TEXT_SHORT_LENGTH),
      }),
      description: new FormControl<string>('', {
        validators: Validators.maxLength(this.TEXT_MAX_LENGTH),
      }),
    });
  }

  private mapCostToFormGroup(cost: Cost): UntypedFormGroup {
    const formGroup = this.createCostFormGroup();
    formGroup.setValue({
      id: cost.id || null,
      title: cost.title,
      currencyCode: cost.currencyCode || 'EUR',
      value: cost.value,
      type: cost.type || null,
      customType: cost.customType || '',
      description: cost.description || '',
    });
    return formGroup;
  }

  private mapFormGroupToCost(group: Object): Cost {
    let c: Cost = {
      id: Number(group['id']),
      title: group['title'],
      value: Number(group['value']),
      currencyCode: group['currencyCode'],
      description: group['description'],
      type: group['type'],
      customType: group['customType'],
    };
    return c;
  }

  private removeDatasetReferences(index: number) {
    const dataset = (this.form.get('datasets') as UntypedFormArray).at(
      index,
    ) as UntypedFormGroup;

    // Storage
    const storageStep = this.form.get('storage') as UntypedFormArray;
    this.removeDatasetReferenceInFormArray(storageStep, dataset);

    // External Storage
    const eStorageStep = this.form.get('externalStorage') as UntypedFormArray;
    this.removeDatasetReferenceInFormArray(eStorageStep, dataset);

    // Repositories
    const repoStep = this.form.get('repositories') as UntypedFormArray;
    this.removeDatasetReferenceInFormArray(repoStep, dataset);
  }

  private removeDatasetReferenceInFormArray(
    array: UntypedFormArray,
    dataset: UntypedFormGroup,
  ) {
    for (let i = 0; i < array.controls?.length; i++) {
      const item = array.at(i);
      const datasets = item.value.datasets.filter(
        entry => entry !== dataset.value.referenceHash,
      );
      item.patchValue({ datasets });
    }
  }

  private getStartDate(): Date {
    if (this.form.value.project?.end || null) {
      const startDate = new Date(this.form.value.project.end);
      startDate.setMonth(startDate.getMonth() - 2);
      return startDate;
    } else {
      return null;
    }
  }

  private setStartDateToNullWhenClosed(dataset: Dataset): Dataset {
    if (dataset.dataAccess === DataAccessType.CLOSED) {
      dataset.startDate = null;
    }
    return dataset;
  }
}
