import {
  closedDatasetMock,
  openDatasetMock,
  restrictedDatasetMock,
} from '../mocks/dataset-mocks';
import { completeDmp, noDataDmp } from '../mocks/dmp-mocks';
import { mockContact, mockContributor1 } from '../mocks/contributor-mocks';

import { Agreement } from '../domain/enum/agreement.enum';
import { ComplianceType } from '../domain/enum/compliance-type.enum';
import { CostType } from '../domain/enum/cost-type.enum';
import { DataKind } from '../domain/enum/data-kind.enum';
import { DataQualityType } from '../domain/enum/data-quality-type.enum';
import { DataSource } from '../domain/enum/data-source.enum';
import { Dmp } from '../domain/dmp';
import { ExternalStorage } from '../domain/external-storage';
import { SecurityMeasure } from '../domain/enum/security-measure.enum';
import { SummaryService } from './summary.service';
import { TestBed } from '@angular/core/testing';
import { mockStorage } from '../mocks/storage-mocks';

describe('SummaryService', () => {
  let service: SummaryService;
  let dmp: Dmp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryService);
    dmp = { ...baseDmp };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test project step', () => {
    const project = {
      description: '',
      dmpExists: false,
      end: undefined,
      funding: undefined,
      id: 0,
      start: undefined,
      title: '',
      universityId: 0,
      funderSupported: false,
      acronym: '',
    };
    let summary = SummaryService.evaluateProjectStep(null);
    expect(summary.completeness).toEqual(0);
    expect(summary.status).toEqual(['dmp.steps.summary.project.none']);

    project.title = 'test';
    summary = SummaryService.evaluateProjectStep(project);
    expect(summary.completeness).toEqual(100);
    expect(summary.status).toEqual([`Project: ${project.title}.`]);
  });

  it('should test contributor step', () => {
    const contributors = [];
    let summary = SummaryService.evaluatePeopleStep(contributors);
    expect(summary.completeness).toEqual(0);
    expect(summary.status).toEqual([
      'dmp.steps.summary.people.contact.missing',
      'dmp.steps.summary.people.contributor.none',
    ]);

    contributors.push(mockContributor1);
    summary = SummaryService.evaluatePeopleStep(contributors);
    expect(summary.completeness).toEqual(50);
    expect(summary.status).toEqual([
      'dmp.steps.summary.people.contact.missing',
      'dmp.steps.summary.people.contributor.one',
    ]);

    contributors.push(mockContact);
    summary = SummaryService.evaluatePeopleStep(contributors);
    expect(summary.completeness).toEqual(100);
    expect(summary.status).toEqual([
      'dmp.steps.summary.people.contact.set',
      'dmp.steps.summary.people.contributor.multiple',
      '2',
    ]);
  });

  it('should test data step', () => {
    let summary = SummaryService.evaluateDataStep(dmp);
    expect(summary.completeness).toEqual(0);
    expect(summary.status).toEqual([
      'dmp.steps.summary.data.specify.none.none',
    ]);

    dmp.dataKind = DataKind.NONE;
    dmp.reusedDataKind = DataKind.NONE;
    summary = SummaryService.evaluateDataStep(dmp);
    expect(summary.completeness).toEqual(50);
    expect(summary.status).toEqual([
      'dmp.steps.summary.data.specify.datasets.none.produced',
      'dmp.steps.summary.data.specify.datasets.none.reused',
      'dmp.steps.summary.data.specify.datasets.missingexplanation',
    ]);

    dmp.dataKind = DataKind.SPECIFY;
    dmp.datasets = [{ ...restrictedDatasetMock }];
    summary = SummaryService.evaluateDataStep(dmp);
    expect(summary.completeness).toEqual(80);
    expect(
      summary.status.includes(
        'dmp.steps.summary.data.specify.datasets.produced',
      ),
    ).toBeTrue();
    expect(
      summary.status.includes(
        'dmp.steps.summary.data.specify.datasets.datageneration',
      ),
    ).toBeTrue();
    expect(summary.status.includes('1. ')).toBeTrue();

    dmp.dataGeneration = 'data generation';
    summary = SummaryService.evaluateDataStep(dmp);
    expect(summary.completeness).toEqual(100);
    expect(
      summary.status.includes(
        'dmp.steps.summary.data.specify.datasets.datageneration',
      ),
    ).toBeFalse();

    dmp.dataKind = DataKind.UNKNOWN;
    summary = SummaryService.evaluateDataStep(dmp);
    expect(summary.completeness).toEqual(50);
    expect(
      summary.status.includes(
        'dmp.steps.summary.data.specify.datasets.unknown.produced',
      ),
    ).toBeTrue();
  });

  it('should test documentation step', () => {
    let summary = SummaryService.evaluateDocumentationStep(dmp);
    expect(summary.completeness).toEqual(0);
    expect(summary.status).toEqual(['dmp.steps.summary.noinfo']);

    dmp.metadata = 'metadata';
    summary = SummaryService.evaluateDocumentationStep(dmp);
    expect(summary.status).toEqual(['dmp.steps.summary.partially']);

    dmp.documentation = 'documentation';
    summary = SummaryService.evaluateDocumentationStep(dmp);
    expect(summary.status).toEqual(['dmp.steps.summary.partially']);

    dmp.structure = 'structure';
    dmp.dataQuality = [DataQualityType.OTHERS];
    summary = SummaryService.evaluateDocumentationStep(dmp);
    expect(summary.status).toEqual(['dmp.steps.summary.partially']);

    dmp.structure = 'structure';
    dmp.dataQuality = [DataQualityType.PEER_REVIEW_OF_DATA];
    summary = SummaryService.evaluateDocumentationStep(dmp);
    expect(summary.status).toEqual(['dmp.steps.summary.allinfo']);
  });

  it('should test storage step', () => {
    dmp.datasets = [{ ...openDatasetMock }];
    let summary = SummaryService.evaluateStorageStep(dmp);
    expect(summary.completeness).toEqual(0);

    let storage = { ...mockStorage };
    storage.datasets = [openDatasetMock.referenceHash];
    dmp.storage = [storage];
    summary = SummaryService.evaluateStorageStep(dmp);
    expect(summary.completeness).toEqual(100);

    let externalStorage: ExternalStorage = {
      id: 0,
      title: '',
      datasets: [openDatasetMock.referenceHash],
    };
    dmp.externalStorage = [externalStorage];
    dmp.storage = [];
    summary = SummaryService.evaluateStorageStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.externalStorageInfo = 'external storage info';
    summary = SummaryService.evaluateStorageStep(dmp);
    expect(summary.completeness).toEqual(100);
  });

  it('should test legal and ethical step', () => {
    let summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.dataRightsAndAccessControl = 'access control';
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toBeGreaterThanOrEqual(100);

    dmp.personalData = true;
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.datasets = [{ ...restrictedDatasetMock }];
    dmp.personalDataCompliance = [ComplianceType.ANONYMISATION];
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toEqual(100);
    expect(summary.status).toEqual(['dmp.steps.summary.allinfo']);

    dmp.personalDataCompliance = [ComplianceType.OTHER];
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.otherPersonalDataCompliance = 'other personal data compliance';
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toEqual(100);

    dmp.personalData = false;
    dmp.sensitiveData = true;
    dmp.sensitiveDataSecurity = [SecurityMeasure.AUTOMATIC_LOCKING_OF_CLIENTS];
    dmp.sensitiveDataAccess = 'data access information';
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toEqual(100);

    dmp.sensitiveData = false;
    dmp.legalRestrictions = true;
    dmp.legalRestrictionsDocuments = [Agreement.CONFIDENTIALITY_AGREEMENT];
    dmp.legalRestrictionsComment = 'comment';
    summary = SummaryService.evaluateLegalStep(dmp);
    expect(summary.completeness).toEqual(100);
  });

  it('should test license step', () => {
    let summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toEqual(100);
    expect(summary.status).toEqual(['dmp.steps.summary.licensing.complete']);

    // Open dataset
    let dataset = { ...openDatasetMock };
    dmp.datasets = [dataset];
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dataset.startDate = new Date();
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toEqual(100);

    // Restricted dataset
    dataset = { ...restrictedDatasetMock };
    dmp.datasets = [dataset];
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.restrictedAccessInfo = 'restricted access info';
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toEqual(100);

    // Closed dataset
    dataset = { ...closedDatasetMock };
    dataset.source = DataSource.NEW;
    dmp.datasets = [dataset];
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.closedAccessInfo = 'closed access info';
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toEqual(100);

    dataset.reasonForDeletion = '';
    dmp.datasets = [dataset];
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dataset.delete = false;
    dmp.datasets = [dataset];
    summary = SummaryService.evaluateLicenseStep(dmp);
    expect(summary.completeness).toEqual(100);
  });

  it('should test repository step', () => {
    dmp.datasets = [{ ...openDatasetMock }];
    let summary = SummaryService.evaluateRepositoryStep(dmp);
    expect(summary.completeness).toEqual(0);

    dmp.repositories = [{ ...noDataDmp.repositories[0] }];
    summary = SummaryService.evaluateRepositoryStep(dmp);
    expect(summary.completeness).toEqual(100);
  });

  it('should test reuse step', () => {
    let summary = SummaryService.evaluateReuseStep(dmp);
    expect(summary.completeness).toEqual(0);

    dmp.targetAudience = 'target audience';
    dmp.tools = 'tools';
    summary = SummaryService.evaluateReuseStep(dmp);
    expect(summary.completeness).toEqual(100);

    dmp.datasets = [{ ...restrictedDatasetMock }];
    summary = SummaryService.evaluateReuseStep(dmp);
    expect(summary.completeness).toBeLessThan(100);

    dmp.restrictedDataAccess = 'restricted data access';
    summary = SummaryService.evaluateReuseStep(dmp);
    expect(summary.completeness).toEqual(100);
  });

  it('should test cost step', () => {
    dmp.costsExist = undefined;
    let summary = SummaryService.evaluateCostStep(dmp);
    expect(summary.completeness).toEqual(0);

    dmp.costsExist = false;
    summary = SummaryService.evaluateCostStep(dmp);
    expect(summary.completeness).toEqual(100);

    dmp.costsExist = true;
    summary = SummaryService.evaluateCostStep(dmp);
    expect(summary.completeness).toEqual(0);

    dmp.costs = [
      {
        currencyCode: 'EUR',
        customType: '',
        description: 'cost description',
        id: -1,
        title: 'New cost',
        type: CostType.DATABASE,
        value: 123,
      },
    ];
    summary = SummaryService.evaluateCostStep(dmp);
    expect(summary.completeness).toEqual(100);
  });

  it('should produce a complete summary', () => {
    let summary = SummaryService.dmpSummary(completeDmp);
    for (const item of summary) {
      expect(item.completeness).toBeGreaterThanOrEqual(100);
    }
  });

  it('should test a no data summary', () => {
    let summary = SummaryService.dmpSummary(noDataDmp);
    for (const item of summary.slice(3)) {
      expect(item.completeness).toEqual(0);
    }
  });

  /** Base DMP without any data.
   *
   * Default values:
   * string: '',
   * boolean: false,
   * array: [],
   * object: undefined,
   * number: 0
   *
   * @example
   * Use like this:
   * const dmp = {...baseDmp};
   */
  const baseDmp: Dmp = {
    closedAccessInfo: '',
    committeeReviewed: false,
    committeeReviewedCris: false,
    contributors: [],
    costs: [],
    costsExist: false,
    costsExistCris: false,
    dataGeneration: '',
    dataKind: undefined,
    dataQuality: [],
    dataRightsAndAccessControl: '',
    datasets: [],
    documentation: '',
    ethicalIssuesExist: false,
    ethicalIssuesExistCris: false,
    externalStorage: [],
    externalStorageInfo: '',
    humanParticipants: false,
    humanParticipantsCris: false,
    id: 0,
    legalRestrictions: false,
    legalRestrictionsComment: '',
    legalRestrictionsCris: false,
    legalRestrictionsDocuments: [],
    metadata: '',
    noDataExplanation: '',
    otherDataQuality: '',
    otherDataSecurityMeasures: '',
    otherLegalRestrictionsDocument: '',
    otherPersonalDataCompliance: '',
    personalData: false,
    personalDataCompliance: [],
    personalDataCris: false,
    project: undefined,
    repositories: [],
    restrictedAccessInfo: '',
    restrictedDataAccess: '',
    reusedDataKind: undefined,
    sensitiveData: false,
    sensitiveDataAccess: '',
    sensitiveDataCris: false,
    sensitiveDataSecurity: [],
    storage: [],
    structure: '',
    targetAudience: '',
    tools: '',
    ethicalIssuesReport: '',
  };
});
