import { Config } from '../domain/config';
import { ServiceConfig } from '../domain/config-services';

// Mock data for service config
export const serviceConfigMockData: ServiceConfig[] = [
  { displayText: 'UNIVERSITY', queryValue: 'UNIVERSITY' },
  { displayText: 'ORCID', queryValue: 'ORCID' },
];

// Mock data for config
export const configMockData: Config = {
  issuer: '',
  clientID: '',
  scope: '',
  userIdClaim: '',
  nameClaim: '',
  givenNameClaim: '',
  familyNameClaim: '',
  emailClaim: '',
  responseType: '',
  userRolesClaimPath: '',
  affiliationClaim: '',
  adminRoleName: '',
  env: '',
  appTitle: '',
  personSearchServiceConfigs: serviceConfigMockData,
  projectSearchServiceConfig: '',
  livePreviewAvailable: true,
  ethicalReportEnabled: true,
  evaluationAvailable: true,
  images: [],
  colorTheme: undefined,
  multitenancyEnabled: false,
  tenants: [],
  templates: [],
  publicAvailable: true,
  consentFormEnabled: true,
  footerAccessibilityUrl: '',
};
