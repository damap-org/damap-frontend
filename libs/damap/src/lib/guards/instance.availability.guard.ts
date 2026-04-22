import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../../../../../apps/damap-frontend/src/app/services/config.service';

@Injectable({ providedIn: 'root' })
export class InstanceAvailabilityGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    if (this.authService.isAdmin()) {
      return of(true);
    }

    var publicAvailable = this.configService.isPublicAvailable();
    console.log('Public availability:', publicAvailable);
    if (publicAvailable) {
      return of(true);
    }

    // navigate to the instance locked page

    this.router.navigate(['/instance-locked']);
    return of(false);
  }
}
