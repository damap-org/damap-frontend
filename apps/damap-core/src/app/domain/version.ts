export interface Version {
  readonly id: number;
  readonly dmpId: number;
  readonly revisionNumber: number;
  readonly versionName: string;
  readonly versionDate: Date;
  readonly editor: string;
}
