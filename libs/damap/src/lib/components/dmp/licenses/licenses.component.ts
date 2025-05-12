import { Component, Input } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { ComplianceType } from '../../../domain/enum/compliance-type.enum';
import { DataAccessType } from '../../../domain/enum/data-access-type.enum';
import { DataSource } from '../../../domain/enum/data-source.enum';
import { LicenseDetails } from '../../../domain/license-details';
import { LicenseDefinitions } from '../../../widgets/license-wizard/license-wizard-list';

@Component({
  selector: 'app-dmp-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css'],
  standalone: false,
})
export class LicensesComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;

  licenses: LicenseDetails[] = LicenseDefinitions;
  accessType: any = DataAccessType;

  translateEnumPrefix = 'enum.dataaccess.';

  readonly datasetSource: any = DataSource;

  setLicenseSelectorResult(event, index: number) {
    const dataset = this.datasets.at(index);
    if (event) {
      dataset.patchValue({ license: event.id });
    }
  }

  get isAnonymisedOrPseudonymised() {
    return (
      this.dmpForm?.value.legal.personalDataCompliance?.includes(
        ComplianceType.ANONYMISATION,
      ) ||
      this.dmpForm?.value.legal.personalDataCompliance?.includes(
        ComplianceType.PSEUDONYMISATION,
      )
    );
  }

  get restricted() {
    return this.datasets?.value.filter(
      item =>
        item.dataAccess === DataAccessType.RESTRICTED &&
        item.source === DataSource.NEW,
    );
  }

  get closed() {
    return this.datasets?.value.filter(
      item =>
        item.dataAccess === DataAccessType.CLOSED &&
        item.source === DataSource.NEW,
    );
  }

  getFormGroup(index: number): UntypedFormGroup {
    return this.datasets.at(index) as UntypedFormGroup;
  }

  get restrictedAccessInfo(): UntypedFormControl {
    return this.dmpForm.get('restrictedAccessInfo') as UntypedFormControl;
  }

  get closedAccessInfo(): UntypedFormControl {
    return this.dmpForm.get('closedAccessInfo') as UntypedFormControl;
  }
}
