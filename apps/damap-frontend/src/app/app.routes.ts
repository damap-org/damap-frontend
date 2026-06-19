import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard, TenantGuard } from '@damap/core';
import { ConsentGuard } from './guard/consent.guard';
import { NoTenantComponent } from './components/no-tenant/no-tenant.component';
import { InstanceLockedComponent } from './components/instance-locked-page/instance-locked.component';
import { InstanceAvailabilityGuard } from '../../../../libs/damap/src/lib/guards/instance.availability.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'no-tenant',
    component: NoTenantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'instance-locked',
    component: InstanceLockedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [
      AuthGuard,
      TenantGuard,
      InstanceAvailabilityGuard,
      ConsentGuard,
    ],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../../libs/damap/src/lib/damap.routes').then(
            m => m.DAMAP_ROUTES,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: `dashboard`,
  },
];
