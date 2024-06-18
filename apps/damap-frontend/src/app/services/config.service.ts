import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Injectable, isDevMode } from '@angular/core';

import { Config } from '@damap/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private router: Router,
  ) {}

  public initializeApp(): Promise<boolean> {
    return this.loadConfig()
      .then((config: Config) => {
        if (!config) {
          // eslint-disable-next-line no-console
          console.error('Config is missing!');
          return new Promise<boolean>(resolve => resolve(false));
        } else {
          this.config = config;
          const authConfig: AuthConfig = {
            issuer: config.authUrl,
            clientId: config.authClient,
            redirectUri: window.location.origin,
            logoutUrl: window.location.origin,
            oidc: true,
            scope: config.authScope,
            // useSilentRefresh: true,
            responseType: 'code',
            showDebugInformation: isDevMode(),
            // sessionChecksEnabled: true,
          };
          this.oauthService.configure(authConfig);
          this.oauthService.setupAutomaticSilentRefresh();
          return this.oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
              if (
                this.oauthService.hasValidIdToken() &&
                this.oauthService.hasValidAccessToken()
              ) {
                const url = decodeURIComponent(this.oauthService.state);
                if (url !== '') {
                  return this.router.navigateByUrl(url);
                }
              }
              return new Promise<boolean>(resolve => resolve(true));
            });
        }
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error(
          'Failed to load config - please make sure your backend is up and running!',
        );
        console.log('Backend: ' + environment.backendurl);
        console.error(error);
        /* eslint-disable no-console */
        return new Promise<boolean>(resolve => resolve(false));
      });
  }

  public getEnvironment() {
    return this.config.env;
  }

  private async loadConfig(): Promise<Config> {
    const host = environment.backendurl;
    const config$ = this.http.get<Config>(`${host}config`);
    return await lastValueFrom(config$);
  }
}
