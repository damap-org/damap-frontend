import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard, TenantGuard, DamapModule } from '@damap/core';
import { ConsentGuard } from './guard/consent.guard';
import { environment } from '../environments/environment';
import { NoTenantComponent } from './components/no-tenant/no-tenant.component';

export const APP_ROUTES: Routes = [
  {
    path: 'no-tenant',
    component: NoTenantComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard, TenantGuard, ConsentGuard],
    children: [
      {
        path: '',
        loadChildren: () => DamapModule.forRoot(environment).ngModule,
      },
    ],
  },
  {
    path: '**',
    redirectTo: `dashboard`,
  },
];
