import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import { Observable } from 'rxjs';
import { Dmp } from '../../../domain/dmp';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelDescription,
} from '@angular/material/expansion';
import { Version } from '../../../domain/version';
import { DataKind } from '../../../domain/enum/data-kind.enum';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { VersionViewProjectComponent } from '../version-view-sections/version-view-project/version-view-project.component';
import { VersionViewContributorsComponent } from '../version-view-sections/version-view-contributors/version-view-contributors.component';
import { VersionViewDatasetsComponent } from '../version-view-sections/version-view-datasets/version-view-datasets.component';
import { VersionViewDocDataQualityComponent } from '../version-view-sections/version-view-doc-data-quality/version-view-doc-data-quality.component';
import { VersionViewLegalEthicalAspectsComponent } from '../version-view-sections/version-view-legal-ethical-aspects/version-view-legal-ethical-aspects.component';
import { VersionViewStoragesComponent } from '../version-view-sections/version-view-storages/version-view-storages.component';
import { VersionViewRepositoriesComponent } from '../version-view-sections/version-view-repositories/version-view-repositories.component';
import { VersionViewReuseComponent } from '../version-view-sections/version-view-reuse/version-view-reuse.component';
import { VersionViewCostsComponent } from '../version-view-sections/version-view-costs/version-view-costs.component';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'app-version-view',
  templateUrl: './version-view.component.html',
  styleUrls: ['./version-view.component.css'],
  imports: [
    MatButton,
    RouterLink,
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    VersionViewProjectComponent,
    VersionViewContributorsComponent,
    MatExpansionPanelDescription,
    VersionViewDatasetsComponent,
    VersionViewDocDataQualityComponent,
    VersionViewLegalEthicalAspectsComponent,
    VersionViewStoragesComponent,
    VersionViewRepositoriesComponent,
    VersionViewReuseComponent,
    VersionViewCostsComponent,
    AsyncPipe,
    TranslateModule,
    TranslatePipeMock,
  ],
})
export class VersionViewComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  versions$: Observable<Version[]>;
  dmp$: Observable<Dmp>;
  id: number;
  revision: number;

  readonly dataKind = DataKind;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.revision = +this.route.snapshot.paramMap.get('revision');
    this.getDmpVersions(this.id);
    this.getDmpVersion(this.id, this.revision);
  }

  getDmpVersions(id: number): void {
    this.versions$ = this.backendService.getDmpVersions(id);
  }

  getDmpVersion(id: number, revision: number): void {
    this.dmp$ = this.backendService.getDmpByIdAndRevision(id, revision);
  }

  getVersionName(versions: Version[]): string {
    return versions.find(item => item.revisionNumber === this.revision)
      ?.versionName;
  }
}
