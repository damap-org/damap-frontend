import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input-wrapper-options',
  templateUrl: './input-wrapper-options.component.html',
  styleUrl: './input-wrapper-options.component.css',
})
export class InputWrapperOptionsComponent implements OnInit {
  @Input() label: string;
  @Input() control: UntypedFormControl;
  @Input() prefix: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() maxLength = 255;
  @Input() info: string;
  @Input() showLength = true;
  @Input() options: {};
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('auto') auto: MatAutocomplete;

  required = false;

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

  onInputChange(value: string): void {
    this.inputChange.emit(value);
  }

  get filteredOptions() {
    return Object.keys(this.options); // Only returns options if they exist
  }

  selectOption(funder: string) {
    this.control.setValue(this.options[funder]);
    this.onInputChange(this.options[funder]);
  }
}
