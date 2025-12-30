import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigService } from '../../../../../apps/damap-frontend/src/app/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oAuthService: OAuthService,
    private configService: ConfigService,
  ) {}

  getDisplayName(): string {
    const claims = this.oAuthService.getIdentityClaims();
    let given_name = claims[this.configService.getGivenNameClaim()];
    let family_name = claims[this.configService.getFamilyNameClaim()];

    return (
      claims[this.configService.getNameClaim()] ||
      (given_name && family_name ? `${given_name} ${family_name}` : null) ||
      claims[this.configService.getEmailClaim()] ||
      ''
    );
  }

  getId(): string {
    const claims = this.oAuthService.getIdentityClaims();
    return claims[this.configService.getUserIdClaim()];
  }

  isAuthenticated(route: string): boolean {
    const isAuthenticated =
      this.oAuthService.hasValidIdToken() &&
      this.oAuthService.hasValidAccessToken();
    if (!isAuthenticated) {
      this.oAuthService.initLoginFlow(route);
    }
    return isAuthenticated;
  }

  isAdmin(): boolean {
    const parts: string[] = this.oAuthService.getAccessToken().split('.');
    const tokenBody: any = JSON.parse('' + window.atob(parts[1]));
    const rolesPath: string = this.configService.getUserRolesClaimPath();
    const pathSegments: string[] = rolesPath.split('/');
    let roles = tokenBody;
    for (const pathSeg of pathSegments) {
      roles = roles?.[pathSeg];
    }

    // If a user has no roles, the IDP may not even return an empty array for the roles claim
    if (!roles || !Array.isArray(roles)) {
      return false;
    }

    return roles.includes(this.configService.getAdminRoleName());
  }

  logout() {
    this.oAuthService.logOut();
  }
}
