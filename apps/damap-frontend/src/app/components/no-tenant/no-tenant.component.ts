import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { AuthService } from '@damap/core';

@Component({
  selector: 'app-no-tenant',
  imports: [MatIcon, MatAnchor],
  templateUrl: './no-tenant.component.html',
  styleUrl: './no-tenant.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NoTenantComponent {
  authService = inject(AuthService);

  public logout() {
    this.authService.logout();
  }
}
