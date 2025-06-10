import { CommonModule } from '@angular/common';
import { DataDeletionModule } from '../data-deletion/data-deletion.module';
import { LicenseWizardModule } from '../../../widgets/license-wizard/license-wizard.module';
import { LicensesComponent } from './licenses.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { TranslateModule } from '@ngx-translate/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LicenseWizardModule,
    StepIntroModule,
    DataDeletionModule,

    // Materials
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  declarations: [LicensesComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    LicenseWizardModule,
    StepIntroModule,
    DataDeletionModule,
    LicensesComponent,

    // Materials
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class LicensesModule {}
