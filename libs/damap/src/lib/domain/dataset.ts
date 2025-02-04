import { DataAccessType } from './enum/data-access-type.enum';
import { AccessRight } from './enum/access-right.enum';
import { DataType } from './enum/data-type.enum';
import { Contributor } from './contributor';
import { DataSource } from './enum/data-source.enum';
import { Identifier } from './identifier';

export interface Dataset {
  readonly id: number;
  title: string;
  type: DataType[];
  fileFormat: string;
  size: number;
  description: string;
  personalData: boolean;
  sensitiveData: boolean;
  legalRestrictions: boolean;
  license: string;
  startDate: Date;
  dataAccess: DataAccessType;
  referenceHash: string; // user ID + timestamp hash
  selectedProjectMembersAccess: AccessRight;
  otherProjectMembersAccess: AccessRight;
  publicAccess: AccessRight;
  delete: boolean;
  dateOfDeletion: Date;
  reasonForDeletion: string;
  deletionPerson: Contributor;
  retentionPeriod: number;
  source: DataSource;
  datasetId: Identifier;
  technicalResources: TechnicalResource[];
}

export interface TechnicalResource {
  name: string;
  description: string;
}
