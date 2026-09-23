import { Routes } from '@angular/router';
import { DmpComponent } from './dmp.component';
import { VersionListComponent } from '../version/version-list/version-list.component';
import { VersionViewComponent } from '../version/version-view/version-view.component';
import { AccessComponent } from '../access/access.component';

export const DMP_ROUTES: Routes = [
  { path: '', component: DmpComponent },
  { path: ':id', component: DmpComponent },
  { path: ':id/access', component: AccessComponent },
  { path: ':id/version', component: VersionListComponent },
  { path: ':id/version/:revision', component: VersionViewComponent },
];
