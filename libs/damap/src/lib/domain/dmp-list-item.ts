import { Project } from './project';
import { FunctionRole } from './enum/function-role.enum';
import { Contributor } from './contributor';

export interface DmpListItem {
  readonly id: number;
  readonly title: string;
  readonly contact: Contributor;
  readonly created: Date;
  readonly modified: Date;
  readonly description: string;
  readonly project: Project;
  readonly accessType: FunctionRole;
  readonly versionCount: number;
  readonly latestVersionName: string;
}
