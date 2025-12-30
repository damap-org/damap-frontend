import { ServiceConfig } from './config-services';

export interface Config {
  readonly issuer: string;
  readonly clientID: string;
  readonly scope: string;
  readonly userRolesClaim: string;
  readonly userIdClaim: string;
  readonly nameClaim: string;
  readonly givenNameClaim: string;
  readonly familyNameClaim: string;
  readonly emailClaim: string;
  readonly responseType: string;
  readonly env: string;
  readonly appTitle: string;
  readonly personSearchServiceConfigs: ServiceConfig[];
  readonly fitsServiceAvailable: boolean;
  readonly livePreviewAvailable: boolean;
  readonly ethicalReportEnabled: boolean;
}
