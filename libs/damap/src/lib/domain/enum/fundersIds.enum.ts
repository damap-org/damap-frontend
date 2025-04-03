import { ETemplateType } from './export-template-type.enum';

export enum EFunderIds {
  EU_FUNDREF_ID = '501100000780',
  EU_ROR_ID = 'https://ror.org/032s10s29',
  EU_ISNI_ID = '0000 0004 6090 9785',

  FWF_FUNDREF_ID = '501100002428',
  FWF_ROR_ID = 'https://ror.org/013tf3c58',
  FWF_ISNI_ID = '0000 0001 1091 8438',
}

export class EFunderIdsHelper {
  private static readonly EUFunderIds: string[] = [
    EFunderIds.EU_FUNDREF_ID,
    EFunderIds.EU_ROR_ID,
    EFunderIds.EU_ISNI_ID,
  ];

  private static readonly FWFFunderIds: string[] = [
    EFunderIds.FWF_FUNDREF_ID,
    EFunderIds.FWF_ROR_ID,
    EFunderIds.FWF_ISNI_ID,
  ];

  public static getEUFunderIds(): string[] {
    return this.EUFunderIds;
  }

  public static getFWFFunderIds(): string[] {
    return this.FWFFunderIds;
  }

  public static getFundersNameId() {
    return {
      [ETemplateType.FWF]: EFunderIds.FWF_FUNDREF_ID,
      [ETemplateType.HORIZON_EUROPE]: EFunderIds.EU_FUNDREF_ID,
    };
  }

  public static toString(funderId: EFunderIds): string {
    return funderId.toString();
  }
}
