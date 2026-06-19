import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard, TenantGuard } from '@damap-frontend-core';
import { ConsentGuard } from './guard/consent.guard';
import { NoTenantComponent } from './components/no-tenant/no-tenant.component';
import { InstanceLockedComponent } from './components/instance-locked-page/instance-locked.component';
import { InstanceAvailabilityGuard } from '@damap-frontend-core/app/guards/instance.availability.guard';

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
    canActivate: [AuthGuard, TenantGuard, InstanceAvailabilityGuard, ConsentGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@damap-frontend-core/app/damap.routes').then((m) => m.DAMAP_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: `dashboard`,
  },
];
