import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import {
  UntypedFormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { MatLabel } from '@angular/material/form-field';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-data-mc',
  templateUrl: './data-mc.component.html',
  styleUrls: ['./data-mc.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    MatLabel,
    MatRadioGroup,
    ReactiveFormsModule,
    MatRadioButton,
    TranslatePipe,
  ],
})
export class DataMcComponent {
  readonly control = input<UntypedFormControl>(undefined);
  readonly questionLabel = input('dmp.steps.data.specify.question.kind');
  readonly answerLabelNone = input('dmp.steps.data.specify.answer.none');

  readonly dataKind: any = DataKind;
}
