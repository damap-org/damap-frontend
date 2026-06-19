import { IdentifierType } from './enum/identifier-type.enum';

export const IdentifierTypeReusedData: Record<IdentifierType[0], string> = {
  [IdentifierType.DOI]: 'DOI',
  [IdentifierType.HANDLE]: 'Handle',
  [IdentifierType.ARK]: 'ARK',
  [IdentifierType.URL]: 'URL',
  [IdentifierType.HDL]: 'HDL',
  [IdentifierType.PURL]: 'PURL',
  [IdentifierType.URN]: 'URN',
  [IdentifierType.OTHER]: 'Other',
};
