import { InternalStorage } from '../domain/internal-storage';
import { SearchResult } from '../domain/search/search-result';
import { Storage } from '../domain/storage';
import { closedDatasetMock, restrictedDatasetMock } from './dataset-mocks';

export const mockInternalStorage: InternalStorage = {
  id: -1,
  url: 'www',
  storageLocation: 'AUT',
  backupLocation: 'AUT',
  active: true,
  translations: [
    {
      id: -1,
      languageCode: 'eng',
      title: 'Internal storage mock',
      description: 'Internal storage mock description',
      storageId: -1,
      backupFrequency: 'weekly',
    },
  ],
};

export const mockStorage: Storage = {
  datasets: [
    closedDatasetMock.referenceHash,
    restrictedDatasetMock.referenceHash,
  ],
  id: -2,
  internalStorageId: -1,
  title: 'Internal storage mock',
};

export const mockInternalStorageSearchResult: SearchResult<InternalStorage> = {
  items: [mockInternalStorage],
  search: null,
};
