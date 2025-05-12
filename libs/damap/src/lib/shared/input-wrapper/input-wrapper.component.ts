import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input-wrapper [label] [control]',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.css'],
  standalone: false,
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
