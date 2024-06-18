import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlansComponent } from './components/plans/plans.component';
import { PlansModule } from './components/plans/plans.module';
import { TranslateModule } from '@ngx-translate/core';
import { DamapStoreModule } from './store/damap-store.module';
import { APP_ENV } from './constants';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { DamapInfoComponent } from './components/damap-info/damap-info.component';
import { DmpInstructionsComponent } from './components/dmp-instructions/dmp-instructions.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminModule } from './components/admin/admin.module';
import { AdminGuard } from './guards/admin.guard';

export const DAMAP_ROUTES: Route[] = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plans', component: PlansComponent },
  {
    path: 'info',
    children: [
      { path: 'damap', component: DamapInfoComponent },
      { path: 'how-to-create', component: DmpInstructionsComponent },
    ],
  },
  {
    path: 'dmp',
    loadChildren: () =>
      import('./components/dmp/dmp.module').then(m => m.DmpModule),
  },
  { path: 'gdpr', component: GdprComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];

const MODULES = [DashboardModule, PlansModule, AdminModule];

@NgModule({
  imports: [
    CommonModule,
    DamapStoreModule,
    TranslateModule,
    RouterModule.forChild(DAMAP_ROUTES),
    ...MODULES,
  ],
})
export class DamapModule {
  static forRoot(env: {
    production: boolean;
    backendurl: string;
  }): ModuleWithProviders<DamapModule> {
    return {
      ngModule: DamapModule,
      providers: [{ provide: APP_ENV, useValue: env }],
    };
  }
}
