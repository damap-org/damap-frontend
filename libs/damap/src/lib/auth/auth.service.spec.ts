import { AuthService } from './auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpyObj('OAuthService', [
      'getAccessToken',
      'hasValidAccessToken',
      'getIdentityClaims',
      'hasValidIdToken',
      'initLoginFlow',
    ]);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: OAuthService, useValue: spy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return full name if both first and last names are provided', () => {
    spy.getIdentityClaims.and.returnValue({
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return name if name is provided', () => {
    spy.getIdentityClaims.and.returnValue({
      name: 'John Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return email if only email is provided', () => {
    spy.getIdentityClaims.and.returnValue({
      email: 'john.doe@example.com',
    });
    expect(service.getDisplayName()).toEqual('john.doe@example.com');
  });

  it('should return full name if both first and last names are present, and name is missing', () => {
    spy.getIdentityClaims.and.returnValue({
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return empty string if no claims are available', () => {
    spy.getIdentityClaims.and.returnValue({});
    expect(service.getDisplayName()).toEqual('');
  });

  it('should return name if name and other details are provided', () => {
    spy.getIdentityClaims.and.returnValue({
      name: 'John Doe',
      given_name: 'John',
      family_name: 'Doe',
      email: 'john.doe@example.com',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return name and username', () => {
    spy.getIdentityClaims.and.returnValue({
      name: 'name',
      preferred_username: 'username',
    });
    expect(service.getUsername()).toEqual('username');
    expect(service.getName()).toEqual('name');
  });

  it('should check if is admin', () => {
    spy.getAccessToken.and.returnValue(
      '.' + window.btoa('{ "realm_access": { "roles": [ "Damap Admin" ] }}'),
    );
    expect(service.isAdmin()).toBeTrue();

    spy.getAccessToken.and.returnValue(
      '.' + window.btoa('{ "realm_access": { "roles": [] }}'),
    );
    expect(service.isAdmin()).toBeFalse();
  });

  it('should return true if the user is authenticated', () => {
    spy.hasValidIdToken.and.returnValue(true);
    spy.hasValidAccessToken.and.returnValue(true);

    const result = service.isAuthenticated('/some-route');

    expect(result).toBeTrue();
    expect(spy.initLoginFlow).not.toHaveBeenCalled();
  });

  it('should return false and call initLoginFlow if the user is not authenticated', () => {
    spy.hasValidIdToken.and.returnValue(false);
    spy.hasValidAccessToken.and.returnValue(false);

    const route = '/some-route';
    const result = service.isAuthenticated(route);

    expect(result).toBeFalse();
    expect(spy.initLoginFlow).toHaveBeenCalledWith(route);
  });

  it('should check if user is admin', () => {
    spy.getAccessToken.and.returnValue(
      '.' + window.btoa('{ "realm_access": { "roles": [ "Damap Admin" ] }}'),
    );
    expect(service.isAdmin()).toBeTrue();

    spy.getAccessToken.and.returnValue(
      '.' + window.btoa('{ "realm_access": { "roles": [] }}'),
    );
    expect(service.isAdmin()).toBeFalse();
  });
});
