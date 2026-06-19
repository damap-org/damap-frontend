import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { ComplianceType } from '../../../domain/enum/compliance-type.enum';
import { DataAccessType } from '../../../domain/enum/data-access-type.enum';
import { DataSource } from '../../../domain/enum/data-source.enum';
import { LicenseDetails } from '../../../domain/license-details';
import { LicenseDefinitions } from '../../../widgets/license-wizard/license-wizard-list';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatLabel, MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { LicenseWizardComponent } from '../../../widgets/license-wizard/license-wizard.component';
import { MatInput } from '@angular/material/input';
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker';
import { DataDeletionComponent } from '../data-deletion/data-deletion.component';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { KeyValuePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatIcon,
    LicenseWizardComponent,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    DataDeletionComponent,
    TextareaWrapperComponent,
    KeyValuePipe,
    TranslatePipe,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class LicensesComponent {
  readonly dmpForm = input<UntypedFormGroup>(undefined);
  readonly datasets = input<UntypedFormArray>(undefined);

  licenses: LicenseDetails[] = LicenseDefinitions;
  accessType: any = DataAccessType;

  translateEnumPrefix = 'enum.dataaccess.';

  readonly datasetSource: any = DataSource;

  setLicenseSelectorResult(event, index: number) {
    const dataset = this.datasets().at(index);
    if (event) {
      dataset.patchValue({ license: event.id });
    }
  }

  get isAnonymisedOrPseudonymised() {
    const dmpForm = this.dmpForm();
    return (
      dmpForm?.value.legal.personalDataCompliance?.includes(ComplianceType.ANONYMISATION) ||
      dmpForm?.value.legal.personalDataCompliance?.includes(ComplianceType.PSEUDONYMISATION)
    );
  }

  get restricted() {
    return this.datasets()?.value.filter(
      (item) => item.dataAccess === DataAccessType.RESTRICTED && item.source === DataSource.NEW,
    );
  }

  get closed() {
    return this.datasets()?.value.filter(
      (item) => item.dataAccess === DataAccessType.CLOSED && item.source === DataSource.NEW,
    );
  }

  getFormGroup(index: number): UntypedFormGroup {
    return this.datasets().at(index) as UntypedFormGroup;
  }

  get restrictedAccessInfo(): UntypedFormControl {
    return this.dmpForm().get('restrictedAccessInfo') as UntypedFormControl;
  }

  get closedAccessInfo(): UntypedFormControl {
    return this.dmpForm().get('closedAccessInfo') as UntypedFormControl;
  }
}
