import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import {
  MatFormFieldAppearance,
  MatFormField,
  MatLabel,
  MatSuffix,
  MatError,
} from '@angular/material/form-field';
import {
  UntypedFormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatIcon,
    MatSuffix,
    MatError,
    TranslatePipe,
  ],
})
export class SearchFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  readonly appearance = input<MatFormFieldAppearance>('outline');
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() errorMessage: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() autocomplete: MatAutocomplete | null = null;

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
