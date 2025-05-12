import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import { Observable } from 'rxjs';
import { Dmp } from '../../../domain/dmp';
import { MatAccordion } from '@angular/material/expansion';
import { Version } from '../../../domain/version';
import { DataKind } from '../../../domain/enum/data-kind.enum';

@Component({
  selector: 'app-version-view',
  templateUrl: './version-view.component.html',
  styleUrls: ['./version-view.component.css'],
  standalone: false,
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
