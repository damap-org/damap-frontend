import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService, BackendService } from '@damap-frontend-core';
import { ConsentComponent } from '../components/consent/consent.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ConsentGuard implements CanActivate {
  private backendService = inject(BackendService);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private configService = inject(ConfigService);

  public consentGiven: boolean;
  public consent;

  constructor() {
    this.consentGiven = true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // in single tenant mode this does nothing
    // in multitenant mode this guards against users logging in without having their affiliation registered
    if (!this.authService.isUserAffiliatedWithATenant()) {
      return true;
    }

    if (!this.authService.isAdmin() && !this.configService.isPublicAvailable()) {
      return true;
    }

    const consentResponse = this.backendService.getConsentGiven();
    consentResponse.subscribe((response) => {
      if (response) {
        this.consentGiven = true;
      } else {
        this.consentGiven = false;

        if (!this.configService.isConsentFormEnabled()) {
          return;
        }

        let dialogRef = this.dialog.open(ConsentComponent, {
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.consentGiven = true;
            this.consent = { consentGiven: true }; //create consentDO object to send
            this.backendService.editConsent(this.consent).subscribe();
          }
        });
      }
    });

    return this.consentGiven;
  }
}
