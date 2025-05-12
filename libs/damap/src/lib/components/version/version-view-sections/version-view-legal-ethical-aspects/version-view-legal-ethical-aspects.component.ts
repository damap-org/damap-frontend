import { Component, Input } from '@angular/core';
import { Dmp } from '../../../../domain/dmp';
import { SecurityMeasure } from '../../../../domain/enum/security-measure.enum';
import { ComplianceType } from '../../../../domain/enum/compliance-type.enum';
import { Agreement } from '../../../../domain/enum/agreement.enum';

@Component({
  selector: 'app-version-view-legal-ethical-aspects',
  templateUrl: './version-view-legal-ethical-aspects.component.html',
  styleUrls: [],
  standalone: false,
})
export class VersionViewLegalEthicalAspectsComponent {
  @Input() dmp: Dmp;

  get otherSecurityMeasure(): boolean {
    return this.dmp?.sensitiveDataSecurity?.includes(SecurityMeasure.OTHER);
  }

  get otherCompliance(): boolean {
    return this.dmp?.personalDataCompliance?.includes(ComplianceType.OTHER);
  }

  get otherDocuments(): boolean {
    return this.dmp?.legalRestrictionsDocuments?.includes(Agreement.OTHER);
  }
}
