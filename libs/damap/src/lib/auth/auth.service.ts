import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oAuthService: OAuthService,
    private router: Router,
  ) {}

  getName(): string {
    return this.getUsername();
  }

  getDisplayName(): string {
    const claims = this.getClaimsFromJWT();
    if (!claims) {
      return '';
    }
    const { upn, email } = claims;

    const displayName = upn || email || '';
    return displayName;
  }

  getUsername(): string {
    const claims = this.getClaimsFromJWT();
    if (!claims) {
      return '';
    }
    return claims['upn'];
  }

  isAuthenticated(route: string): boolean {
    let isAuthenticated = !!localStorage.getItem('damap_session_token');
    // Check if token is expired
    const claims = this.getClaimsFromJWT();
    if (claims) {
      const exp = claims['exp'];
      const now = Math.floor(Date.now() / 1000);

      const REFRESH_LEEWAY_SECONDS = 3 * 60 * 60; // 3 hours

      if (exp + REFRESH_LEEWAY_SECONDS < now) {
        localStorage.removeItem('damap_session_token');
        isAuthenticated = false;
      }
    }

    // If not authenticated, start the login flow
    if (!isAuthenticated) {
      this.oAuthService.initLoginFlow(route);
    }
    return isAuthenticated;
  }

  isExpiredToken(): boolean {
    const claims = this.getClaimsFromJWT();
    if (!claims) {
      return true;
    }
    const exp = claims['exp'];
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  }

  isAdmin(): boolean {
    const claims = this.getClaimsFromJWT();
    if (!claims) {
      return false;
    }
    return claims['groups']?.includes('Damap Admin');
  }

  logout() {
    localStorage.removeItem('damap_session_token');
    // Navigate to start page, remove anything after first /
    this.router.navigateByUrl('/');
  }

  getId(): string {
    const claims = this.getClaimsFromJWT();
    if (!claims) {
      return '';
    }
    return claims['sub'];
  }

  getClaimsFromJWT(): any {
    const jwtToken = localStorage.getItem('damap_session_token');
    if (!jwtToken) {
      return null;
    }
    const claims = JSON.parse(atob(jwtToken.split('.')[1]));
    return claims;
  }
}
