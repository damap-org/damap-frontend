import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../../../../../apps/damap-frontend/src/app/services/config.service';

@Injectable({ providedIn: 'root' })
export class InstanceAvailabilityGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAdmin() || this.configService.isPublicAvailable()) {
      return true;
    }

    // tenant guard will take over
    if (!this.authService.isUserAffiliatedWithATenant()) {
      return true;
    }

    return this.router.createUrlTree(['/instance-locked']);
  }
}
