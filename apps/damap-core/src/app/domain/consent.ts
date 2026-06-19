export interface Consent {
  readonly id: number;
  universityId: string;
  consentGiven: boolean;
  givenDate: Date;
}
