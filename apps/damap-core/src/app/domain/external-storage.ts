import { Host } from './host';

export interface ExternalStorage extends Host {
  url?: string;
  backupFrequency?: string;
  storageLocation?: string;
  backupLocation?: string;
  isManagedInternally?: boolean;
}
