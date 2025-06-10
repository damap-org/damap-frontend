import { Component, Input } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { Agreement } from '../../../domain/enum/agreement.enum';
import { ComplianceType } from '../../../domain/enum/compliance-type.enum';
import { SecurityMeasure } from '../../../domain/enum/security-measure.enum';

@Component({
  selector: 'app-dmp-legal-ethical-aspects',
  templateUrl: './legal-ethical-aspects.component.html',
  styleUrls: ['./legal-ethical-aspects.component.css'],
})
export class LegalEthicalAspectsComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() legalEthicalStep: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;
  @Input() ethicalReportEnabled: boolean;

  translateAgreementPrefixEnum = 'enum.agreement.';
  translateCompliancePrefixEnum = 'enum.compliance.';
  translateSecurityPrefixEnum = 'enum.securitymeasure.';

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  optionsLinksEthics: string[] = [
    'Guidelines on Safeguarding Good Scientific Practice',
  ];

  questions = [
    {
      label: 'dmp.steps.legal.question.personalData',
      model: 'personalData',
      cris: 'personalDataCris',
    },
    {
      label: 'dmp.steps.legal.question.legalRestrictions',
      model: 'legalRestrictions',
      cris: 'legalRestrictionsCris',
    },
  ];

  complianceOptions: any = ComplianceType;
  securityOptions: any = SecurityMeasure;
  agreementOptions: any = Agreement;

  originalOrder = (): number => 0;

  get sensitiveDataAccess(): UntypedFormControl {
    return this.legalEthicalStep.get(
      'sensitiveDataAccess',
    ) as UntypedFormControl;
  }

  get otherPersonalDataCompliance(): UntypedFormControl {
    return this.legalEthicalStep?.get(
      'otherPersonalDataCompliance',
    ) as UntypedFormControl;
  }

  get otherDataSecurityMeasures(): UntypedFormControl {
    return this.legalEthicalStep.get(
      'otherDataSecurityMeasures',
    ) as UntypedFormControl;
  }

  get legalRestrictionsComment(): UntypedFormControl {
    return this.legalEthicalStep?.get(
      'legalRestrictionsComment',
    ) as UntypedFormControl;
  }

  get otherLegalRestrictionsDocuments(): UntypedFormControl {
    return this.legalEthicalStep.get(
      'otherLegalRestrictionsDocuments',
    ) as UntypedFormControl;
  }

  get dataRightsAndAccessControl(): UntypedFormControl {
    return this.legalEthicalStep.get(
      'dataRightsAndAccessControl',
    ) as UntypedFormControl;
  }

  get isOtherSelected() {
    return this.legalEthicalStep?.controls.personalDataCompliance?.value.includes(
      ComplianceType.OTHER,
    );
  }

  get isOtherMeasureSelected() {
    return this.legalEthicalStep.controls.sensitiveDataSecurity.value?.includes(
      SecurityMeasure.OTHER,
    );
  }

  get isOtherDocumentSelected() {
    return this.legalEthicalStep.controls.legalRestrictionsDocuments.value?.includes(
      Agreement.OTHER,
    );
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
