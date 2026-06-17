import { CommonModule } from '@angular/common';

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

import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
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
    TranslatePipe,
    TranslateDirective,
    // Materials
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    LicensesComponent,
  ],
  exports: [
    CommonModule,
    TranslatePipe,
    TranslateDirective,
    ReactiveFormsModule,
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
