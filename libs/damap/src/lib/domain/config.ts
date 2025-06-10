import { ServiceConfig } from './config-services';

export interface Config {
  readonly authUrl: string;
  readonly authClient: string;
  readonly authScope: string;
  readonly authUser: string;
  readonly env: string;
  readonly appTitle: string;
  readonly personSearchServiceConfigs: ServiceConfig[];
  readonly fitsServiceAvailable: boolean;
  readonly livePreviewAvailable: boolean;
  readonly ethicalReportEnabled: boolean;
}
