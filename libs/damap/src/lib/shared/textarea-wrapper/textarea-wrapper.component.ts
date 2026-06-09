import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldAppearance, MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatAutocompleteTrigger, MatAutocomplete, MatOption } from '@angular/material/autocomplete';
import { Dataset } from '../../domain/dataset';

import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-textarea-wrapper [label] [control]',
    templateUrl: './textarea-wrapper.component.html',
    styleUrls: ['./textarea-wrapper.component.css'],
    imports: [
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    FormsModule,
    ReactiveFormsModule,
    MatHint,
    MatAutocompleteTrigger,
    MatIconButton,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatError,
    TranslateModule
],
})
export class TextareaWrapperComponent implements OnInit {
  @Input() label: string;
  @Input() longLabel: string;
  @Input() labelSuffix: string;
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
