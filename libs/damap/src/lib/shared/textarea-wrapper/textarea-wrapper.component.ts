import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  input,
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
  MatHint,
  MatError,
} from '@angular/material/form-field';
import {
  MatAutocompleteTrigger,
  MatAutocomplete,
  MatOption,
} from '@angular/material/autocomplete';
import { Dataset } from '../../domain/dataset';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-textarea-wrapper [label] [control]',
  templateUrl: './textarea-wrapper.component.html',
  styleUrls: ['./textarea-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    CdkTextareaAutosize,
    FormsModule,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatHint,
    MatIconButton,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatError,
    TranslatePipe,
  ],
})
export class TextareaWrapperComponent implements OnInit {
  @Input() label: string;
  readonly longLabel = input<string>(undefined);
  @Input() labelSuffix: string;
  readonly labelDatasets = input<Dataset[]>(undefined);
  @Input() control: UntypedFormControl;
  readonly placeholder = input<string>(undefined);
  @Input() autocompleteOptions: string[];
  readonly appearance = input<MatFormFieldAppearance>('fill');
  readonly maxLength = input(4000);
  readonly showLength = input(true);
  readonly minRows = input(5);
  readonly maxRows = input(9);
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
