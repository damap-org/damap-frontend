import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, isDevMode } from '@angular/core';

import { Config } from '@damap/core';
import { ConfigService } from './config.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    spyOn(console, 'warn'); // Set up the spy only once.

    const oauthSpy = jasmine.createSpyObj('OAuthService', [
      'configure',
      'setupAutomaticSilentRefresh',
      'loadDiscoveryDocumentAndTryLogin',
      'hasValidIdToken',
      'hasValidAccessToken',
    ]);

    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ConfigService,
        { provide: OAuthService, useValue: oauthSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
    mockOAuthService = TestBed.inject(
      OAuthService,
    ) as jasmine.SpyObj<OAuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#initializeApp', () => {
    it('should load config and set up OAuthService correctly', async () => {
      const mockConfig: Config = {
        authUrl: 'https://auth-url',
        authClient: 'client-id',
        authScope: 'scope',
        env: 'test-env',
        appTitle: 'Test App Title',
        authUser: '',
        personSearchServiceConfigs: [],
        fitsServiceAvailable: false,
        livePreviewAvailable: true,
        ethicalReportEnabled: true,
      };

      mockOAuthService.loadDiscoveryDocumentAndTryLogin.and.returnValue(
        Promise.resolve(true),
      );
      mockOAuthService.hasValidIdToken.and.returnValue(true);
      mockOAuthService.hasValidAccessToken.and.returnValue(true);

      const initializePromise = service.initializeApp();

      const req = httpMock.expectOne(`${environment.backendurl}config`);
      expect(req.request.method).toBe('GET');
      req.flush(mockConfig);

      await initializePromise;

      expect(mockOAuthService.configure).toHaveBeenCalledWith({
        issuer: mockConfig.authUrl,
        clientId: mockConfig.authClient,
        redirectUri: window.location.origin,
        logoutUrl: window.location.origin,
        oidc: true,
        scope: mockConfig.authScope,
        responseType: 'code',
        showDebugInformation: isDevMode(),
      });

      expect(mockOAuthService.setupAutomaticSilentRefresh).toHaveBeenCalled();
    });

    it('should log a warning if appTitle is missing', async () => {
      const mockConfig = {
        authUrl: 'https://auth-url',
        authClient: 'client-id',
        authScope: 'scope',
        env: 'test-env',
        appTitle: null,
        authUser: '',
        personSearchServiceConfigs: [],
        fitsServiceAvailable: false,
        livePreviewAvailable: true,
      };

      mockOAuthService.loadDiscoveryDocumentAndTryLogin.and.returnValue(
        Promise.resolve(true),
      );
      mockOAuthService.hasValidIdToken.and.returnValue(true);
      mockOAuthService.hasValidAccessToken.and.returnValue(true);

      const initializePromise = service.initializeApp();
      const req = httpMock.expectOne(`${environment.backendurl}config`);
      req.flush(mockConfig);

      await initializePromise;
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledWith(
        'App title is missing in the config',
      );
    });
  });

  describe('#getAppTitle', () => {
    it('should return the appTitle from the loaded config', () => {
      const mockConfig: Config = {
        authUrl: 'https://auth-url',
        authClient: 'client-id',
        authScope: 'scope',
        env: 'test-env',
        appTitle: 'Test App Title',
        authUser: '',
        personSearchServiceConfigs: [],
        fitsServiceAvailable: false,
        livePreviewAvailable: true,
        ethicalReportEnabled: true,
      };

      service['config'] = mockConfig;

      const appTitle = service.getAppTitle();
      expect(appTitle).toEqual('Test App Title');
    });

    it('should return the default title if appTitle is missing', () => {
      service['config'] = null;

      const appTitle = service.getAppTitle();
      expect(appTitle).toEqual('DAMAP Frontend');
    });
  });

  describe('initializeApp with no config', () => {
    it('should return false and log error when config is missing', async () => {
      const initializePromise = service.initializeApp();
      const req = httpMock.expectOne(`${environment.backendurl}config`);
      req.flush(null);

      await initializePromise;
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledWith('Config is missing!');
    });
  });
});
