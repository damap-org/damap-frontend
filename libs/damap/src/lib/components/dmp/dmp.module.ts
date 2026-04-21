import { TranslateModule } from '@ngx-translate/core';

import { AccessComponent } from '../access/access.component';
import { CommonModule } from '@angular/common';
import { CostsModule } from './costs/costs.module';
import { DMP_ROUTES } from './dmp.routes';
import { DataDeletionModule } from './data-deletion/data-deletion.module';
import { DataStorageModule } from './data-storage/data-storage.module';
import { DmpActionsModule } from './dmp-actions/dmp-actions.module';
import { DmpComponent } from './dmp.component';
import { DocDataQualityModule } from './doc-data-quality/doc-data-quality.module';
import { FormsModule } from '@angular/forms';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';
import { LegalEthicalAspectsModule } from './legal-ethical-aspects/legal-ethical-aspects.module';
import { LicensesModule } from './licenses/licenses.module';
import { LivePreviewModule } from './live-preview/live-preview.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { PeopleModule } from './people/people.module';
import { ProjectModule } from './project/project.module';
import { RepoModule } from './repo/repo.module';
import { ReuseModule } from './reuse/reuse.module';
import { RouterModule } from '@angular/router';
import { SpecifyDataModule } from './specify-data/specify-data.module';
import { SummaryModule } from './summary/summary.module';
import { ToggleButtonsModule } from '../../widgets/toggle-buttons/toggle-buttons.module';
import { VersionModule } from '../version/version.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DMP_ROUTES),
    FormsModule,
    ToggleButtonsModule,
    ProjectModule,
    MatButtonToggleModule,
    TranslateModule.forChild({ extend: true }),
    VersionModule,
    AccessComponent,
    // Steps
    ProjectModule,
    PeopleModule,
    SpecifyDataModule,
    DocDataQualityModule,
    LegalEthicalAspectsModule,
    DataStorageModule,
    LicensesModule,
    DataDeletionModule,
    RepoModule,
    ReuseModule,
    CostsModule,
    SummaryModule,

    // Live preview
    LivePreviewModule,
    InfoCardComponent,
    // Materials
    MatStepperModule,
    MatIconModule,
    DmpActionsModule,
  ],
  declarations: [DmpComponent],
})
export class DmpModule {}
