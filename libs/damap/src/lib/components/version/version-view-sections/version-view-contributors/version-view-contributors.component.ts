import { Component, Input } from '@angular/core';
import { Contributor } from '../../../../domain/contributor';
import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';
import { MatIcon } from '@angular/material/icon';
import { OrcidComponent } from '../../../../widgets/orcid/orcid.component';
import { TagComponent } from '../../../../widgets/tag/tag.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-view-contributors',
  templateUrl: './version-view-contributors.component.html',
  styleUrls: ['./version-view-contributors.component.css'],
  imports: [MatIcon, OrcidComponent, TagComponent, TranslatePipe],
})
export class VersionViewContributorsComponent {
  @Input() contributors: Contributor[];
  readonly identifierType = IdentifierType;
}
