import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { APP_ENV } from './constants';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminModule } from './components/admin/admin.module';
import { CommonModule } from '@angular/common';
import { DamapInfoComponent } from './components/damap-info/damap-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DmpInstructionsComponent } from './components/dmp-instructions/dmp-instructions.component';
import { EditImagesPageComponent } from './components/admin/edit-images-page/edit-images-page.component';
import { EditRepositoriesPageComponent } from './components/admin/edit-repositories-page/edit-repositories-page.component';
import { EditThemePageComponent } from './components/admin/edit-theme-page/edit-theme-page.component';
import { EditTranslationsPageComponent } from './components/admin/edit-translations-page/edit-translations-page.component';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { PlansComponent } from './components/plans/plans.component';
import { PlansModule } from './components/plans/plans.module';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { EditTemplatesPageComponent } from './components/admin/edit-templates-page/edit-templates-page.component';

export const DAMAP_ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'plans',
    component: PlansComponent,
  },
  {
    path: 'info',
    children: [
      {
        path: 'damap',
        component: DamapInfoComponent,
      },
      {
        path: 'how-to-create',
        component: DmpInstructionsComponent,
      },
    ],
  },
  {
    path: 'dmp',
    loadChildren: () =>
      import('./components/dmp/dmp.module').then(m => m.DmpModule),
  },
  {
    path: 'gdpr',
    component: GdprComponent,
  },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  {
    path: 'admin/theme',
    component: EditThemePageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/images',
    component: EditImagesPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/repositories',
    component: EditRepositoriesPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/templates',
    component: EditTemplatesPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/translations',
    component: EditTranslationsPageComponent,
    canActivate: [AdminGuard],
  },
];

const MODULES = [PlansModule, AdminModule];

@NgModule({
  imports: [
    CommonModule,
    TranslatePipe, TranslateDirective,
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
