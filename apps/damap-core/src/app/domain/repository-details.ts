export interface RepositoryDetails {
  readonly id: string;
  readonly name: string;
  repositoryIdentifier?: string[];
  repositoryURL?: string;
  repositoryLanguages?: string[];
  description?: string;
  versioning?: boolean;
  contentTypes?: string[];
  metadataStandards?: string[];
}
