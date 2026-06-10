import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormFieldAppearance,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatHint,
  MatError,
} from '@angular/material/form-field';
import { TooltipComponent } from '../../widgets/tooltip/tooltip.component';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'app-input-wrapper [label] [control]',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.css'],
  imports: [
    MatFormField,
    MatLabel,
    TooltipComponent,
    MatPrefix,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatHint,
    MatError,
    TranslateModule,
    TranslatePipeMock,
  ],
})
export class InputWrapperComponent implements OnInit {
  @Input() label: string;
  @Input() control: UntypedFormControl;
  @Input() prefix: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() maxLength = 255;
  @Input() info: string;
  @Input() stepSize = 100;
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  required = false;

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

  onInputChange(value: string): void {
    this.inputChange.emit(value);
  }
}
