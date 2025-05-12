import { Component, Input } from '@angular/core';
import { Contributor } from '../../../../domain/contributor';
import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';

@Component({
  selector: 'app-version-view-contributors',
  templateUrl: './version-view-contributors.component.html',
  styleUrls: ['./version-view-contributors.component.css'],
  standalone: false,
})
export class VersionViewContributorsComponent {
  @Input() contributors: Contributor[];
  readonly identifierType = IdentifierType;
}
