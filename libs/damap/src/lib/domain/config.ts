import { ServiceConfig } from './config-services';
import { ColorTheme } from './color-theme';
import { BackendImage } from './backend-image';

export interface Config {
  readonly issuer: string;
  readonly clientID: string;
  readonly scope: string;
  readonly userRolesClaimPath: string;
  readonly userIdClaim: string;
  readonly nameClaim: string;
  readonly givenNameClaim: string;
  readonly familyNameClaim: string;
  readonly emailClaim: string;
  readonly adminRoleName: string;
  readonly responseType: string;
  readonly env: string;
  readonly appTitle: string;
  readonly personSearchServiceConfigs: ServiceConfig[];
  readonly fitsServiceAvailable: boolean;
  readonly livePreviewAvailable: boolean;
  readonly ethicalReportEnabled: boolean;
  readonly images: BackendImage[];
  readonly colorTheme: ColorTheme;
  readonly institutionMode?: boolean;
}
