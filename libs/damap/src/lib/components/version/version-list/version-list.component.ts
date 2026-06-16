import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Version } from '../../../domain/version';
import { DmpListItem } from '../../../domain/dmp-list-item';
import { AuthService } from '../../../auth/auth.service';
import { Dmp } from '../../../domain/dmp';
import { DmpStore } from '../../../data-access/dmp.store';
import { VersionTableComponent } from '../version-table/version-table.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: [],
  imports: [VersionTableComponent, AsyncPipe],
})
export class VersionListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private backendService = inject(BackendService);
  private dmpStore = inject(DmpStore);
  private auth = inject(AuthService);

  versions$: Observable<Version[]>;
  private readonly dmpId = signal<number | null>(null);
  private readonly adminDmp = signal<Dmp | null>(null);
  private readonly storedDmp = computed(() => {
    const id = this.dmpId();
    return id ? this.dmpStore.dmpById(id) : null;
  });
  readonly dmp = computed<DmpListItem | Dmp | null>(
    () => this.adminDmp() ?? this.storedDmp() ?? null,
  );

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dmpId.set(id);
      if (this.auth.isAdmin()) {
        this.backendService
          .getDmpById(id)
          .subscribe(dmp => this.adminDmp.set(dmp));
      } else {
        this.getDmpList();
      }
      this.getVersions(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  getDmpList() {
    this.dmpStore.loadDmps(false);
  }

  getVersions(id: number) {
    this.versions$ = this.backendService.getDmpVersions(id);
  }

  onViewVersion($event: number) {
    this.router.navigate([$event], { relativeTo: this.route });
  }
}
