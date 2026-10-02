import { AuthService } from './auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach, MockedObject } from 'vitest';
import { TranslateTestingModule } from '@damap-frontend-core';
import { ConfigService } from '@damap-frontend-shell/app/services/config.service';

describe('AuthService', () => {
  let service: AuthService;
  let oAuthSpy: Partial<MockedObject<OAuthService>>;
  const configServiceSpy = {
    getNameClaim: vi.fn().mockReturnValue('name'),
    getGivenNameClaim: vi.fn().mockReturnValue('given_name'),
    getFamilyNameClaim: vi.fn().mockReturnValue('family_name'),
    getEmailClaim: vi.fn().mockReturnValue('email'),
    getUserRolesClaimPath: vi.fn().mockReturnValue('roles'),
    getAdminRoleName: vi.fn().mockReturnValue('damap-super-admin'),
  };

  beforeEach(() => {
    oAuthSpy = {
      getAccessToken: vi.fn().mockName('OAuthService.getAccessToken'),
      hasValidAccessToken: vi.fn().mockName('OAuthService.hasValidAccessToken'),
      getIdentityClaims: vi.fn().mockName('OAuthService.getIdentityClaims'),
      hasValidIdToken: vi.fn().mockName('OAuthService.hasValidIdToken'),
      initLoginFlow: vi.fn().mockName('OAuthService.initLoginFlow'),
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateTestingModule],
      providers: [
        { provide: OAuthService, useValue: oAuthSpy },
        { provide: ConfigService, useValue: configServiceSpy },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return full name if both first and last names are provided', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return name if name is provided', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({
      name: 'John Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return email if only email is provided', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({
      email: 'john.doe@example.com',
    });
    expect(service.getDisplayName()).toEqual('john.doe@example.com');
  });

  it('should return full name if both first and last names are present, and name is missing', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return empty string if no claims are available', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({});
    expect(service.getDisplayName()).toEqual('');
  });

  it('should return name if name and other details are provided', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({
      name: 'John Doe',
      given_name: 'John',
      family_name: 'Doe',
      email: 'john.doe@example.com',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return name', () => {
    oAuthSpy.getIdentityClaims!.mockReturnValue({
      name: 'name',
    });
    expect(service.getDisplayName()).toEqual('name');
  });

  it('should check if is admin', () => {
    oAuthSpy.getAccessToken!.mockReturnValue(
      '.' + window.btoa('{ "roles": [ "damap-super-admin" ] }'),
    );
    expect(service.isAdmin()).toBe(true);

    oAuthSpy.getAccessToken!.mockReturnValue(
      '.' + window.btoa('{ "realm_access": { "roles": [] }}'),
    );
    expect(service.isAdmin()).toBe(false);
  });

  it('should return true if the user is authenticated', () => {
    oAuthSpy.hasValidIdToken!.mockReturnValue(true);
    oAuthSpy.hasValidAccessToken!.mockReturnValue(true);

    const result = service.isAuthenticated('/some-route');

    expect(result).toBe(true);
    expect(oAuthSpy.initLoginFlow).not.toHaveBeenCalled();
  });

  it('should return false and call initLoginFlow if the user is not authenticated', () => {
    oAuthSpy.hasValidIdToken!.mockReturnValue(false);
    oAuthSpy.hasValidAccessToken!.mockReturnValue(false);

    const route = '/some-route';
    const result = service.isAuthenticated(route);

    expect(result).toBe(false);
    expect(oAuthSpy.initLoginFlow).toHaveBeenCalledWith(route);
  });

  it('should check if user is admin', () => {
    oAuthSpy.getAccessToken!.mockReturnValue(
      '.' + window.btoa('{ "roles": [ "damap-super-admin" ] }'),
    );
    expect(service.isAdmin()).toBe(true);

    oAuthSpy.getAccessToken!.mockReturnValue(
      '.' + window.btoa('{ "realm_access": { "roles": [] }}'),
    );
    expect(service.isAdmin()).toBe(false);
  });
});
