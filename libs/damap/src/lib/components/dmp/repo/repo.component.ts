import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  loadAllRepositories,
  loadRecommendedRepositories,
  loadRepository,
  setRepositoryFilter,
} from '../../../store/actions/repository.actions';
import {
  selectFilters,
  selectRecommendedRepositories,
  selectRecommendedRepositoriesLoaded,
  selectRepositories,
  selectRepositoriesLoaded,
} from '../../../store/selectors/repository.selectors';

import { AppState } from '../../../store/states/app.state';
import { DataSource } from '../../../domain/enum/data-source.enum';
import { Dataset } from '../../../domain/dataset';
import { LoadingState } from '../../../domain/enum/loading-state.enum';
import { Observable } from 'rxjs';
import { RepositoryDetails } from '../../../domain/repository-details';

@Component({
  selector: 'app-dmp-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
  standalone: false,
})
export class RepoComponent implements OnInit {
  repositoriesLoaded$!: Observable<LoadingState>;
  repositories$!: Observable<RepositoryDetails[]>; // Repo list loaded from backend
  recommendedLoaded$!: Observable<LoadingState>;
  recommended$!: Observable<RepositoryDetails[]>;
  filters$!: Observable<{ [key: string]: { id: string; label: string }[] }>;

  @Input() dmpForm: UntypedFormGroup;
  @Input() repoStep: UntypedFormArray;
  @Input() datasets: UntypedFormArray;

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryToRemove = new EventEmitter<any>();
  @Output() viewChange = new EventEmitter<'primaryView' | 'secondaryView'>();

  LoadingState = LoadingState;
  readonly retentionOptions: number[] = [10, 25, 100];
  readonly datasetTableHeaders: string[] = ['dataset', 'deposit', 'retention'];

  selectedTabIndex = 0;
  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  constructor(public store: Store<AppState>) {}

  ngOnInit() {
    this.repositoriesLoaded$ = this.store.pipe(
      select(selectRepositoriesLoaded),
    );
    this.repositories$ = this.store.pipe(select(selectRepositories));
    this.filters$ = this.store.pipe(select(selectFilters));
    this.recommendedLoaded$ = this.store.pipe(
      select(selectRecommendedRepositoriesLoaded),
    );
    this.recommended$ = this.store.pipe(select(selectRecommendedRepositories));
    this.store.dispatch(loadRecommendedRepositories());
    this.store.dispatch(loadAllRepositories(true));
    this.syncAllRetentionControls();
    this.repoStep.valueChanges.subscribe(() => this.syncAllRetentionControls());
  }

  get newDatasets(): AbstractControl[] {
    if (!this.datasets) return [];
    return this.datasets.controls.filter(
      c => c.value.source === DataSource.NEW,
    );
  }

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }

  removeRepository(index: number): void {
    this.repositoryToRemove.emit(index);
  }

  getRepositoryDetails(repo: RepositoryDetails) {
    if (!repo.description) {
      this.store.dispatch(loadRepository({ id: repo.id }));
    }
  }

  filterRepositories(
    filter: { [key: string]: { id: string; label: string }[] } | null,
  ) {
    if (filter) {
      this.store.dispatch(setRepositoryFilter({ filter }));
    } else {
      this.store.dispatch(loadAllRepositories());
    }
  }

  isDatasetInRepo(repoIndex: number, datasetHash: string): boolean {
    const repoDatasets =
      this.repoStep.at(repoIndex).get('datasets')?.value || [];
    return repoDatasets.includes(datasetHash);
  }

  isDatasetAssigned(datasetHash: string): boolean {
    return this.repoStep.controls.some(repoControl => {
      const repoDatasets = repoControl.get('datasets')?.value || [];
      return repoDatasets.includes(datasetHash);
    });
  }

  toggleDatasetInRepo(repoIndex: number, datasetHash: string): void {
    const datasetsControl = this.repoStep.at(repoIndex).get('datasets');
    const current = [...(datasetsControl?.value || [])];
    const idx = current.indexOf(datasetHash);
    if (idx === -1) {
      current.push(datasetHash);
    } else {
      current.splice(idx, 1);
    }
    datasetsControl?.setValue(current);
  }

  getRetentionControl(datasetHash: string): UntypedFormControl | null {
    const idx = this.datasets.controls.findIndex(
      c => c.value.referenceHash === datasetHash,
    );
    if (idx < 0) return null;
    return this.datasets.controls[idx].get(
      'retentionPeriod',
    ) as UntypedFormControl;
  }

  getDatasetsMarkedForDeletion(index: number): Dataset[] {
    const repo = this.repoStep.at(index);
    return this.datasets.value.filter(
      item => item.delete && repo.value.datasets.includes(item.referenceHash),
    );
  }

  getDatasetsMarkedForDeletionAsString(index: number): string {
    const datasets: Dataset[] = this.getDatasetsMarkedForDeletion(index);
    let result = '';
    for (const [i, item] of datasets.entries()) {
      result += `"${item.title}"`;
      result += i < datasets.length - 1 ? ', ' : '';
    }
    return result;
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
    this.viewChange.emit(view);
  }

  private syncRetentionControl(datasetHash: string): void {
    const idx = this.datasets.controls.findIndex(
      c => c.value.referenceHash === datasetHash,
    );
    if (idx < 0) return;
    const control = this.datasets.controls[idx].get('retentionPeriod');
    if (!control) return;
    if (this.isDatasetAssigned(datasetHash)) {
      control.enable({ emitEvent: false });
    } else {
      control.disable({ emitEvent: false });
    }
  }

  private syncAllRetentionControls(): void {
    if (!this.datasets) return;
    for (const datasetControl of this.datasets.controls) {
      this.syncRetentionControl(datasetControl.value.referenceHash);
    }
  }
}
