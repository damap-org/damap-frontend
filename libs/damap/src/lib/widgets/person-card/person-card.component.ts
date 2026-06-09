import { Component, Input } from '@angular/core';

import { Contributor } from '../../domain/contributor';
import { IdentifierType } from '../../domain/enum/identifier-type.enum';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';
import { Access } from '@damap/core';
import { OrcidComponent } from '../orcid/orcid.component';

/**
 * This component displays user details for both project Contributors (metadata) and Access entries (permissions).
 * Since 'Contributor' and 'Access' share common fields (firstName, lastName, mbox) but have distinct
 * identifier fields, we use a union type. The getters below use the 'in' operator as a type guard
 * to safely access properties that only exist on 'Contributor' (like personId), preventing runtime errors.
 */
@Component({
  selector: 'damap-person-card',
  imports: [
    TranslateModule,
    MatCardModule,
    MatIconModule,
    OrcidComponent
],
  templateUrl: './person-card.component.html',
  styleUrls: [],
  standalone: true,
})
export class PersonCardComponent {
  @Input() person: Contributor | Access;

  readonly identifierType: any = IdentifierType;

  // Safely check if 'personId' exists
  get personId() {
    return 'personId' in this.person
      ? (this.person as Contributor).personId
      : undefined;
  }

  // Safely check if 'contact' exists
  get contact() {
    return 'contact' in this.person
      ? (this.person as Contributor).contact
      : undefined;
  }
}
