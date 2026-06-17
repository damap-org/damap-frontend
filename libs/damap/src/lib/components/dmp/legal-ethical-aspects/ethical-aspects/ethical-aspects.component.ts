import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TooltipComponent } from '../../../../widgets/tooltip/tooltip.component';
import { CrisTagComponent } from '../../../../widgets/cris-tag/cris-tag.component';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { InfoMessageComponent } from '../../../../widgets/info-message/info-message.component';
import { InputWrapperComponent } from '../../../../shared/input-wrapper/input-wrapper.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-ethical-aspects',
  templateUrl: './ethical-aspects.component.html',
  styleUrls: ['./ethical-aspects.component.css'],
  imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    TooltipComponent,
    CrisTagComponent,
    MatRadioGroup,
    MatRadioButton,
    InfoMessageComponent,
    InputWrapperComponent,
    TranslatePipe,
  ],
})
export class EthicalAspectsComponent implements OnInit {
  @Input() legalEthicalStep: UntypedFormGroup;
  @Input() ethicalReportEnabled: boolean;

  get ethicalIssuesReport(): UntypedFormControl {
    return this.legalEthicalStep.get(
      'ethicalIssuesReport',
    ) as UntypedFormControl;
  }

  ngOnInit(): void {
    this.legalEthicalStep
      .get('committeeReviewed')
      .valueChanges.subscribe(value => {
        // Set ethical Report URL to ""
        this.ethicalIssuesReport.setValue(null);
      });
  }
}
