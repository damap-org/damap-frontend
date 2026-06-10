import { NgModule } from '@angular/core';
import { VersionListComponent } from './version-list/version-list.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { VersionViewComponent } from './version-view/version-view.component';
import { VersionTableComponent } from './version-table/version-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VersionViewProjectComponent } from './version-view-sections/version-view-project/version-view-project.component';
import { VersionViewContributorsComponent } from './version-view-sections/version-view-contributors/version-view-contributors.component';
import { VersionViewDatasetsComponent } from './version-view-sections/version-view-datasets/version-view-datasets.component';
import { VersionViewLegalEthicalAspectsComponent } from './version-view-sections/version-view-legal-ethical-aspects/version-view-legal-ethical-aspects.component';
import { VersionViewDocDataQualityComponent } from './version-view-sections/version-view-doc-data-quality/version-view-doc-data-quality.component';
import { VersionViewRepositoriesComponent } from './version-view-sections/version-view-repositories/version-view-repositories.component';
import { VersionViewStoragesComponent } from './version-view-sections/version-view-storages/version-view-storages.component';
import { VersionViewCostsComponent } from './version-view-sections/version-view-costs/version-view-costs.component';
import { OrcidModule } from '../../widgets/orcid/orcid.module';
import { TagModule } from '../../widgets/tag/tag.module';
import { ByteModule } from '../../pipes/byte/byte.module';
import { RouterModule } from '@angular/router';
import { VersionViewReuseComponent } from './version-view-sections/version-view-reuse/version-view-reuse.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    OrcidModule,
    TagModule,
    ByteModule,
    // Materials
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    VersionListComponent,
    VersionViewComponent,
    VersionTableComponent,
    VersionViewProjectComponent,
    VersionViewContributorsComponent,
    VersionViewDatasetsComponent,
    VersionViewLegalEthicalAspectsComponent,
    VersionViewDocDataQualityComponent,
    VersionViewRepositoriesComponent,
    VersionViewStoragesComponent,
    VersionViewCostsComponent,
    VersionViewReuseComponent,
  ],
  exports: [
    VersionListComponent,
    VersionViewComponent,
    // Materials
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class VersionModule {}
