import { DmpListItem } from '../domain/dmp-list-item';
import { FunctionRole } from '../domain/enum/function-role.enum';
import { mockProject } from './project-mocks';
import { mockContact } from './contributor-mocks';

export const mockDmpList: DmpListItem[] = [
  {
    id: 1,
    title: 'Mock Dmp',
    contact: mockContact,
    created: new Date(10000),
    modified: new Date(100000),
    description: 'Mock Dmp List Item',
    project: mockProject,
    accessType: FunctionRole.OWNER,
    versionCount: 1,
    latestVersionName: 'Mock Version',
  },
];
