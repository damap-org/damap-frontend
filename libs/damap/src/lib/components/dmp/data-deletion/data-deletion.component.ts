import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { Contributor } from '../../../domain/contributor';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-data-deletion',
  templateUrl: './data-deletion.component.html',
  styleUrls: ['./data-deletion.component.css'],
  standalone: false,
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
