import {
  LicenseSelectorDialogComponent,
  LicenseWizardComponent,
} from './license-wizard.component';

import { CommonModule } from '@angular/common';
import { LicenseFilterPipe } from './license-filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    TooltipModule,
    MatInputModule,
  ],
  declarations: [
    LicenseWizardComponent,
    LicenseSelectorDialogComponent,
    LicenseFilterPipe,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    LicenseWizardComponent,
    SharedModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    TooltipModule,
    MatInputModule,
  ],
})
export class LicenseWizardModule {}
