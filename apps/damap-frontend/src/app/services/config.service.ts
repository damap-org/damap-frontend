import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import {
  BehaviorSubject,
  catchError,
  Observable,
  lastValueFrom,
  throwError,
} from 'rxjs';
import { inject, Injectable, isDevMode } from '@angular/core';

import { Config } from '@damap/core';
import { FeedbackService } from '@damap/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ColorThemeService } from './color-theme.service';
import { ImageThemeService } from './image-theme.service';
import { TranslateService } from "@ngx-translate/core";
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private colorThemeService = inject(ColorThemeService);
  private imageThemeService = inject(ImageThemeService);

  private config: Config;
  private backendDown$ = new BehaviorSubject<boolean>(true);
  private firstAttempt = true;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private router: Router,
    private feedbackService: FeedbackService,
    private translate: TranslateService,
  ) {}

  public initializeApp(): Promise<boolean> {
    return this.loadConfig()
      .then((config: Config) => {
        if (!this.firstAttempt) {
          this.feedbackService.success('landing.servers-up');
        }
        this.backendDown$.next(false);
        if (!config) {
          // eslint-disable-next-line no-console
          console.warn('Config is missing!');
          return new Promise<boolean>(resolve => resolve(false));
        } else {
          console.log(config);
          this.config = config;
          this.colorThemeService.applyTheming(config);
          this.imageThemeService.applyTheming(config);
          const appTitle = config.appTitle;
          if (!appTitle) {
            // eslint-disable-next-line no-console
            console.warn('App title is missing in the config');
          }
          const authConfig: AuthConfig = {
            issuer: config.issuer,
            clientId: config.clientID,
            redirectUri: window.location.origin,
            logoutUrl: window.location.origin,
            responseType: config.responseType,
            oidc: true,
            scope: config.scope,
            showDebugInformation: isDevMode(),
          };
          this.oauthService.configure(authConfig);
          this.oauthService.setupAutomaticSilentRefresh();
          return this.oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(async () => {
              if (
                this.oauthService.hasValidIdToken() &&
                this.oauthService.hasValidAccessToken()
              ) {
                const tenantConfig = await this.loadConfig();
                this.config = tenantConfig;
                console.log(this.config);
                this.colorThemeService.applyTheming(tenantConfig);
                this.imageThemeService.applyTheming(tenantConfig);
                for (const lang of this.translate.langs) {
                  this.translate.resetLang(lang);
                }
                const appTitle = config.appTitle;
                if (!appTitle) {
                  // eslint-disable-next-line no-console
                  console.warn('App title is missing in the config');
                }

                const url = decodeURIComponent(this.oauthService.state!);
                if (url !== '') {
                  return this.router.navigateByUrl(url);
                }
              }
              return true;
            })
            .catch(error => {
              // TODO: Use the same error handling mechanism as the main config call
              /* eslint-disable no-console */
              console.error(
                'Failed to load tenant specific config after login - please make sure your backend is up and running!',
              );
              console.error(error);
              return false;
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

        this.backendDown$.next(true);

        if (this.firstAttempt) {
          this.firstAttempt = false;
          this.feedbackService.error('landing.servers-down-retrying');
          setTimeout(() => {
            this.initializeApp();
          }, 10000);
        } else {
          this.feedbackService.error('landing.servers-down', undefined, 0);
        }

        return false;
      });
  }

  public isBackendDown(): Observable<boolean> {
    return this.backendDown$;
  }

  public getEnvironment() {
    return this.config.env;
  }

  public getAppTitle(): string {
    return this.config?.appTitle || 'DAMAP Frontend';
  }

  public getUserIdClaim(): string {
    return this.config?.userIdClaim || null;
  }

  public getNameClaim(): string {
    return this.config?.nameClaim || null;
  }

  public getGivenNameClaim(): string {
    return this.config?.givenNameClaim || null;
  }

  public getFamilyNameClaim(): string {
    return this.config?.familyNameClaim || null;
  }

  public getEmailClaim(): string {
    return this.config?.emailClaim || null;
  }

  public getUserRolesClaimPath(): string {
    return this.config?.userRolesClaimPath || null;
  }

  public getAffiliationClaim(): string {
    return this.config?.affiliationClaim || null;
  }

  public getAdminRoleName(): string {
    return this.config?.adminRoleName || null;
  }

  public getProjectService(): string {
    return this.config?.projectSearchServiceConfig || null;
  }

  public getConfig(): Config {
    return this.config;
  }

  private async loadConfig(): Promise<Config> {
    const host = environment.backendurl;
    const config$ = this.http.get<Config>(`${host}config`);
    let rawConfig = await lastValueFrom(config$);
    return rawConfig;
  }

  public async refreshConfig(): Promise<Config> {
    const host = environment.backendurl;

    return lastValueFrom(
      this.http.get<Config>(`${host}config`).pipe(
        catchError(err => {
          this.feedbackService.error('landing.servers-down');
          return throwError(() => err);
        }),
      ),
    ).then(rawConfig => {
      this.config = rawConfig;
      return rawConfig;
    });
  }

  public getTenants(): string[] {
    return this.config?.tenants ?? [];
  }

  public isMultitenancyEnabled(): boolean {
    return this.config?.multitenancyEnabled ?? false;
  }

  public getActiveTemplates(): any[] {
    return this.config?.templates?.filter(t => t.active) || [];
  }
}
