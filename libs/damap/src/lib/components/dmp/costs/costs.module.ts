import { CommonModule } from '@angular/common';
import { CostsComponent } from './costs.component';
import { CrisTagModule } from '../../../widgets/cris-tag/cris-tag.module';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    StepIntroModule,
    SharedModule,
    CrisTagModule,
    InfoMessageModule,

    // Materials
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
  ],
  declarations: [CostsComponent],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    SharedModule,
    CrisTagModule,
    CostsComponent,
    InfoMessageModule,

    // Materials
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class CostsModule {}
