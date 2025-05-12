import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Version } from '../../../domain/version';
import { Store } from '@ngrx/store';
import { selectDmpById } from '../../../store/selectors/dmp.selectors';
import { AppState } from '../../../store/states/app.state';
import { DmpListItem } from '../../../domain/dmp-list-item';
import { loadDmps } from '../../../store/actions/dmp.actions';
import { AuthService } from '../../../auth/auth.service';
import { Dmp } from '../../../domain/dmp';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: [],
  standalone: false,
})
export class VersionListComponent implements OnInit {
  versions$: Observable<Version[]>;
  dmp$: Observable<DmpListItem | Dmp>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private store: Store<AppState>,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      if (this.auth.isAdmin()) {
        this.dmp$ = this.backendService.getDmpById(id);
      } else {
        this.getDmpList();
        this.dmp$ = this.store.select(selectDmpById({ id: id }));
      }
      this.getVersions(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  getDmpList() {
    this.store.dispatch(loadDmps(false));
  }

  getVersions(id: number) {
    this.versions$ = this.backendService.getDmpVersions(id);
  }

  onViewVersion($event: number) {
    this.router.navigate([$event], { relativeTo: this.route });
  }
}
