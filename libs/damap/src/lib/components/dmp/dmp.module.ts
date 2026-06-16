import { TranslateModule } from '@ngx-translate/core';

import { AccessComponent } from '../access/access.component';
import { CommonModule } from '@angular/common';

import { DMP_ROUTES } from './dmp.routes';

import { DmpComponent } from './dmp.component';

import { FormsModule } from '@angular/forms';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';

import { LicensesModule } from './licenses/licenses.module';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';

import { ProjectModule } from './project/project.module';

import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DMP_ROUTES),
    FormsModule,
    ProjectModule,
    MatButtonToggleModule,
    TranslateModule.forChild({ extend: true }),
    AccessComponent,
    // Steps
    ProjectModule,
    LicensesModule,
    InfoCardComponent,
    // Materials
    MatStepperModule,
    MatIconModule,
    DmpComponent,
  ],
})
export class DmpModule {}
