import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.css',
})
export class SearchFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() errorMessage: string = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
