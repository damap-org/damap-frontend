import { Component, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';
import { notEmptyValidator } from '../../../../validators/not-empty.validator';
import { orcidValidator } from '../../../../validators/orcid.validator';

@Component({
  selector: 'app-contributor-manual',
  templateUrl: './contributor-manual.component.html',
  styleUrls: ['./contributor-manual.component.css'],
})
export class ContributorManualComponent {
  @Output() contactPerson = new EventEmitter<any>();
  @Output() contributorToAdd = new EventEmitter<any>();

  show = false;

  form = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
    ]),
    lastName: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
    ]),
    mbox: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
    ]),
    personId: new UntypedFormGroup({
      type: new UntypedFormControl(IdentifierType.ORCID),
      identifier: new UntypedFormControl('', [
        orcidValidator(),
        Validators.maxLength(19),
      ]),
    }),
  });

  changeContactPerson() {
    const contact = this.form.getRawValue();
    this.contactPerson.emit(contact);
    this.resetForm();
  }

  addContributor() {
    const contributor = this.form.getRawValue();
    this.contributorToAdd.emit(contributor);
    this.resetForm();
  }

  firstName(): UntypedFormControl {
    return this.form.controls.firstName as UntypedFormControl;
  }

  lastName(): UntypedFormControl {
    return this.form.controls.lastName as UntypedFormControl;
  }

  mbox(): UntypedFormControl {
    return this.form.controls.mbox as UntypedFormControl;
  }

  identifier(): UntypedFormControl {
    return (this.form.controls.personId as UntypedFormGroup).controls
      .identifier as UntypedFormControl;
  }

  resetForm() {
    this.show = false;
    this.form.reset();
    (this.form.controls.personId as UntypedFormGroup).controls.type.setValue(
      IdentifierType.ORCID,
    );
  }
}
