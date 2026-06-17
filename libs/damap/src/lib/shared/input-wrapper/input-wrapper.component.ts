import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-input-wrapper [label] [control]',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
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
    TranslatePipe,
  ],
})
export class InputWrapperComponent implements OnInit {
  @Input() label: string;
  @Input() control: UntypedFormControl;
  readonly prefix = input<string>(undefined);
  readonly type = input<string>(undefined);
  readonly placeholder = input<string>(undefined);
  readonly appearance = input<MatFormFieldAppearance>('outline');
  readonly maxLength = input(255);
  @Input() info: string;
  readonly stepSize = input(100);
  readonly inputChange = output<string>();

  required = false;

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

  onInputChange(value: string): void {
    this.inputChange.emit(value);
  }
}
