import { CommonModule } from '@angular/common';
import { CrisTagModule } from '../../../widgets/cris-tag/cris-tag.module';
import { EthicalAspectsComponent } from './ethical-aspects/ethical-aspects.component';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { LegalEthicalAspectsComponent } from './legal-ethical-aspects.component';
import { LegalEthicalInstructionComponent } from './legal-ethical-instruction/legal-ethical-instruction.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { ToggleButtonsModule } from '../../../widgets/toggle-buttons/toggle-buttons.module';
import { TooltipModule } from '../../../widgets/tooltip/tooltip.module';
import { TranslateModule } from '@ngx-translate/core';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    StepIntroModule,
    CrisTagModule,
    TooltipModule,
    InfoMessageModule,
    ToggleButtonsModule,

    // Materials
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  declarations: [
    LegalEthicalAspectsComponent,
    EthicalAspectsComponent,
    LegalEthicalInstructionComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    StepIntroModule,
    CrisTagModule,
    TooltipModule,
    InfoMessageModule,
    LegalEthicalAspectsComponent,
    LegalEthicalInstructionComponent,

    // Materials
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class LegalEthicalAspectsModule {}
