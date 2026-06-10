import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocDataQualityComponent } from './doc-data-quality.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { SharedModule } from '../../../shared/shared.module';
import { TooltipModule } from '../../../widgets/tooltip/tooltip.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    TooltipModule,
    SharedModule,
    // Materials
    MatSelectModule,
    DocDataQualityComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    TooltipModule,
    SharedModule,
    DocDataQualityComponent,
    // Materials
    MatSelectModule,
  ],
})
export class DocDataQualityModule {}
