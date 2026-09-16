import { Host } from './host';

export interface Repository extends Host {
  readonly repositoryId: string;
}
