import {
  ConfirmDeletionDialogComponent,
  PeopleComponent,
} from './people.component';

import { ContributorFilterPipe } from './contributor-filter.pipe';
import { ContributorManualComponent } from './contributor-manual/contributor-manual.component';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { OrcidModule } from '../../../widgets/orcid/orcid.module';
import { PeopleInstructionComponent } from './people-instruction/people-instruction.component';
import { PersonSearchModule } from '../../../widgets/person-search/person-search.module';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { ToggleButtonsModule } from '../../../widgets/toggle-buttons/toggle-buttons.module';

@NgModule({
  imports: [
    SharedModule,
    StepIntroModule,
    OrcidModule,
    PersonSearchModule,
    InfoMessageModule,
    ToggleButtonsModule,

    // Materials
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
  ],
  declarations: [
    PeopleComponent,
    ContributorManualComponent,
    ContributorFilterPipe,
    ConfirmDeletionDialogComponent,
    PeopleInstructionComponent,
  ],
  exports: [
    SharedModule,
    StepIntroModule,
    OrcidModule,
    PersonSearchModule,
    PeopleComponent,
    PeopleInstructionComponent,

    // Materials
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class PeopleModule {}
