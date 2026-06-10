import { Component, Input } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Contributor } from '../../../domain/contributor';
import {
  MatSlideToggleChange,
  MatSlideToggle,
} from '@angular/material/slide-toggle';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-data-deletion',
  templateUrl: './data-deletion.component.html',
  styleUrls: ['./data-deletion.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggle,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    TextareaWrapperComponent,
    TranslateModule,
  ],
})
export class DataDeletionComponent {
  @Input() dataset: UntypedFormGroup;
  @Input() dmpForm: UntypedFormGroup;

  getSelection = (contributor1: Contributor, contributor2: Contributor) =>
    contributor1?.id === contributor2?.id;

  setDateOfDeletion($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.dataset.controls.dateOfDeletion.setValue(
        this.dmpForm.value.project?.end,
      );
    }
  }

  get contributors(): Contributor[] {
    return this.dmpForm.get('contributors')?.value;
  }

  get reasonForDeletion(): UntypedFormControl {
    return this.dataset.controls.reasonForDeletion as UntypedFormControl;
  }
}
