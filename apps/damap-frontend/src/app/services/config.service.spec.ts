import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { isDevMode, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '@damap/core';
import { environment } from '../../environments/environment';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
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
    // mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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
      expect(req.request.method).toBe('GET');
      req.flush(mockConfig);

      await initializePromise;

      // Verify OAuth configuration was called
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

    it('should handle config loading failure', async () => {
      const consoleErrorSpy = spyOn(console, 'error');

      const initializePromise = service.initializeApp();
      const req = httpMock.expectOne(`${environment.backendurl}config`);
      req.error(new ErrorEvent('Network error'));

      await initializePromise;

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to load config - please make sure your backend is up and running!',
      );
    });
  });

  describe('#getEnvironment', () => {
    it('should return the environment from the loaded config', async () => {
      const mockConfig: Config = {
        authUrl: 'https://auth-url',
        authClient: 'client-id',
        authScope: 'scope',
        env: 'test-env',
        authUser: '',
        personSearchServiceConfigs: [],
        fitsServiceAvailable: false,
        livePreviewAvailable: true,
      };

      service['config'] = mockConfig;

      const environment = service.getEnvironment();
      expect(environment).toEqual('test-env');
    });
  });

  describe('initializeApp with no config', () => {
    it('should return false and log error when config is missing', async () => {
      spyOn(console, 'error'); // Spy on console.error to check if it was called

      service.initializeApp().then(result => {
        expect(result).toBeFalse();
      });

      const req = httpMock.expectOne(`${environment.backendurl}config`);
      expect(req.request.method).toBe('GET');
      req.flush(null); // Respond with null to simulate missing config
    });
  });
});
