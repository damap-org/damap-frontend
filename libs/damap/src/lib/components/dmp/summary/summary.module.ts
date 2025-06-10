import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SummaryComponent } from './summary.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    // Materials
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatLabel,
    MatCardModule,
  ],
  declarations: [SummaryComponent],
  exports: [
    CommonModule,
    TranslateModule,
    SummaryComponent,

    // Materials
    MatTableModule,
    MatProgressBarModule,
    MatStepperModule,
  ],
})
export class SummaryModule {}
