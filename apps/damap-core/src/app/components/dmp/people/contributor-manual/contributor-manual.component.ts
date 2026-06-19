import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';
import { notEmptyValidator } from '../../../../validators/not-empty.validator';
import { orcidValidator } from '../../../../validators/orcid.validator';
import { MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { InputWrapperComponent } from '../../../../shared/input-wrapper/input-wrapper.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contributor-manual',
  templateUrl: './contributor-manual.component.html',
  styleUrls: ['./contributor-manual.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatLabel,
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    MatButton,
    MatIcon,
    TranslatePipe,
  ],
})
export class ContributorManualComponent {
  readonly contactPerson = output<any>();
  readonly contributorToAdd = output<any>();

  show = false;

  form = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
      Validators.required,
    ]),
    lastName: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
      Validators.required,
    ]),
    mbox: new UntypedFormControl('', [
      notEmptyValidator(),
      Validators.maxLength(4000),
      Validators.required,
    ]),
    personId: new UntypedFormGroup({
      type: new UntypedFormControl(IdentifierType.ORCID),
      identifier: new UntypedFormControl('', [orcidValidator(), Validators.maxLength(19)]),
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
    (this.form.controls.personId as UntypedFormGroup).controls.type.setValue(IdentifierType.ORCID);
  }
}
