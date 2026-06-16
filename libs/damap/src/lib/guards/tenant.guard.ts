import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '@damap/core';
import { ConfigService } from '../../../../../apps/damap-frontend/src/app/services/config.service';

@Injectable()
export class TenantGuard implements CanActivate {
  private configService = inject(ConfigService);
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (this.authService.isUserAffiliatedWithATenant()) {
      return true;
    }
    return this.router.createUrlTree(['/no-tenant']);
  }
}
