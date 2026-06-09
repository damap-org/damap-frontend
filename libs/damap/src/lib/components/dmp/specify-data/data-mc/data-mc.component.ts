import { Component, Input } from '@angular/core';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { MatLabel } from '@angular/material/form-field';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../../testing/translate-testing/translate-testing.module';

@Component({
    selector: 'app-data-mc',
    templateUrl: './data-mc.component.html',
    styleUrls: ['./data-mc.component.css'],
    imports: [
        FormsModule,
        MatLabel,
        MatRadioGroup,
        ReactiveFormsModule,
        MatRadioButton,
        TranslateModule,
        TranslatePipeMock,
    ],
})
export class DataMcComponent {
  @Input() control: UntypedFormControl;
  @Input() questionLabel = 'dmp.steps.data.specify.question.kind';
  @Input() answerLabelNone = 'dmp.steps.data.specify.answer.none';

  readonly dataKind: any = DataKind;
}
