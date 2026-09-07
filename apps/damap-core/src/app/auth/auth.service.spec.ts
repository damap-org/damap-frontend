import { AuthService } from './auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
  let spy;

  beforeEach(() => {
    spy = {
      getAccessToken: vi.fn().mockName('OAuthService.getAccessToken'),
      hasValidAccessToken: vi.fn().mockName('OAuthService.hasValidAccessToken'),
      getIdentityClaims: vi.fn().mockName('OAuthService.getIdentityClaims'),
      hasValidIdToken: vi.fn().mockName('OAuthService.hasValidIdToken'),
      initLoginFlow: vi.fn().mockName('OAuthService.initLoginFlow'),
    };
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
    spy.getIdentityClaims.mockReturnValue({
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return name if name is provided', () => {
    spy.getIdentityClaims.mockReturnValue({
      name: 'John Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return email if only email is provided', () => {
    spy.getIdentityClaims.mockReturnValue({
      email: 'john.doe@example.com',
    });
    expect(service.getDisplayName()).toEqual('john.doe@example.com');
  });

  it('should return full name if both first and last names are present, and name is missing', () => {
    spy.getIdentityClaims.mockReturnValue({
      given_name: 'John',
      family_name: 'Doe',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return empty string if no claims are available', () => {
    spy.getIdentityClaims.mockReturnValue({});
    expect(service.getDisplayName()).toEqual('');
  });

  it('should return name if name and other details are provided', () => {
    spy.getIdentityClaims.mockReturnValue({
      name: 'John Doe',
      given_name: 'John',
      family_name: 'Doe',
      email: 'john.doe@example.com',
    });
    expect(service.getDisplayName()).toEqual('John Doe');
  });

  it('should return name', () => {
    spy.getIdentityClaims.mockReturnValue({
      name: 'name',
    });
    expect(service.getDisplayName()).toEqual('name');
  });

  it('should check if is admin', () => {
    spy.getAccessToken.mockReturnValue('.' + window.btoa('{ "roles": [ "damap-super-admin" ] }'));
    expect(service.isAdmin()).toBe(true);

    spy.getAccessToken.mockReturnValue('.' + window.btoa('{ "realm_access": { "roles": [] }}'));
    expect(service.isAdmin()).toBe(false);
  });

  it('should return true if the user is authenticated', () => {
    spy.hasValidIdToken.mockReturnValue(true);
    spy.hasValidAccessToken.mockReturnValue(true);

    const result = service.isAuthenticated('/some-route');

    expect(result).toBe(true);
    expect(spy.initLoginFlow).not.toHaveBeenCalled();
  });

  it('should return false and call initLoginFlow if the user is not authenticated', () => {
    spy.hasValidIdToken.mockReturnValue(false);
    spy.hasValidAccessToken.mockReturnValue(false);

    const route = '/some-route';
    const result = service.isAuthenticated(route);

    expect(result).toBe(false);
    expect(spy.initLoginFlow).toHaveBeenCalledWith(route);
  });

  it('should check if user is admin', () => {
    spy.getAccessToken.mockReturnValue('.' + window.btoa('{ "roles": [ "damap-super-admin" ] }'));
    expect(service.isAdmin()).toBe(true);

    spy.getAccessToken.mockReturnValue('.' + window.btoa('{ "realm_access": { "roles": [] }}'));
    expect(service.isAdmin()).toBe(false);
  });
});
