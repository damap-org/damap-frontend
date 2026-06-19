export interface InternalStorage {
  readonly id: number;
  readonly url: string;
  readonly storageLocation: string;
  readonly backupLocation: string;
  readonly active: boolean;

  // the following information comes from the translation table
  readonly translations: InternalStorageTranslation[];
}

export interface InternalStorageTranslation {
  readonly id: number;
  readonly languageCode: string;
  readonly title: string;
  readonly description: string;
  readonly storageId: number;
  readonly backupFrequency: string;
}
