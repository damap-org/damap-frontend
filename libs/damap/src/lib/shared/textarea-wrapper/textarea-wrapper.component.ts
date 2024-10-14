import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Dataset } from '../../domain/dataset';

@Component({
  selector: 'app-textarea-wrapper [label] [control]',
  templateUrl: './textarea-wrapper.component.html',
  styleUrls: ['./textarea-wrapper.component.css'],
})
export class TextareaWrapperComponent implements OnInit {
  @Input() label: string;
  @Input() labelDatasets: Dataset[];
  @Input() control: UntypedFormControl;
  @Input() placeholder: string;
  @Input() autocompleteOptions: string[];
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() maxLength = 4000;
  @Input() showLength = true;
  @Input() minRows = 5;
  @Input() maxRows = 9;
  @ViewChild(MatAutocompleteTrigger)
  autocompleteTrigger: MatAutocompleteTrigger;

  required = false;

  isAutocompleteOpen: boolean = false;

  ngOnInit(): void {
    this.required = this.control?.hasValidator(Validators.required);
  }

  updateAutocompletePosition() {
    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.updatePosition();
    }
  }

  closeAutocomplete(): void {
    this.isAutocompleteOpen = false;
  }

  openAutocomplete(): void {
    this.isAutocompleteOpen = true;
  }
}
