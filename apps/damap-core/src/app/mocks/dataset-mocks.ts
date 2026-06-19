import { Dataset } from '../domain/dataset';
import { DataAccessType } from '../domain/enum/data-access-type.enum';
import { AccessRight } from '../domain/enum/access-right.enum';
import { DataType } from '../domain/enum/data-type.enum';
import { mockContributor1 } from './contributor-mocks';
import { DataSource } from '../domain/enum/data-source.enum';
import { IdentifierType } from '../domain/enum/identifier-type.enum';

export const openDatasetMock: Dataset = {
  description: '',
  dataAccess: DataAccessType.OPEN,
  id: 82,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '#open',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: [DataType.ARCHIVED_DATA],
  fileFormat: 'zip',
  selectedProjectMembersAccess: AccessRight.WRITE,
  otherProjectMembersAccess: AccessRight.READ,
  publicAccess: AccessRight.NONE,
  delete: true,
  dateOfDeletion: new Date(20000),
  deletionPerson: mockContributor1,
  reasonForDeletion: 'reason1',
  retentionPeriod: 10,
  source: DataSource.NEW,
  datasetId: {
    identifier: 'XXXXX',
    type: IdentifierType.DOI,
  },
  technicalResources: [],
};

export const closedDatasetMock: Dataset = {
  description: '',
  dataAccess: DataAccessType.CLOSED,
  id: 82,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '#closed',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: [DataType.ARCHIVED_DATA],
  fileFormat: 'zip',
  selectedProjectMembersAccess: AccessRight.WRITE,
  otherProjectMembersAccess: AccessRight.READ,
  publicAccess: AccessRight.NONE,
  delete: true,
  dateOfDeletion: new Date(20000),
  deletionPerson: mockContributor1,
  reasonForDeletion: 'reason1',
  retentionPeriod: 10,
  source: DataSource.REUSED,
  datasetId: {
    identifier: 'XXXXX',
    type: IdentifierType.DOI,
  },
  technicalResources: [],
};

export const restrictedDatasetMock: Dataset = {
  description: '',
  dataAccess: DataAccessType.RESTRICTED,
  id: 83,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '#restricted',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: [DataType.ARCHIVED_DATA],
  fileFormat: 'zip',
  selectedProjectMembersAccess: AccessRight.WRITE,
  otherProjectMembersAccess: AccessRight.READ,
  publicAccess: AccessRight.NONE,
  delete: false,
  dateOfDeletion: null,
  deletionPerson: null,
  reasonForDeletion: '',
  retentionPeriod: null,
  source: DataSource.NEW,
  datasetId: null,
  technicalResources: [],
};
