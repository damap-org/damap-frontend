export interface Host {
  readonly id: number;
  title: string;
  datasets?: string[]; // referenceHashes
}
