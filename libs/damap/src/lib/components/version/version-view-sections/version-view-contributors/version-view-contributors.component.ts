import { Component, Input } from '@angular/core';
import { Contributor } from '../../../../domain/contributor';
import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';

import { MatIcon } from '@angular/material/icon';
import { OrcidComponent } from '../../../../widgets/orcid/orcid.component';
import { TagComponent } from '../../../../widgets/tag/tag.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../../testing/translate-testing/translate-testing.module';

@Component({
    selector: 'app-version-view-contributors',
    templateUrl: './version-view-contributors.component.html',
    styleUrls: ['./version-view-contributors.component.css'],
    imports: [
    MatIcon,
    OrcidComponent,
    TagComponent,
    TranslateModule,
    TranslatePipeMock
],
})
export class VersionViewContributorsComponent {
  @Input() contributors: Contributor[];
  readonly identifierType = IdentifierType;
}
