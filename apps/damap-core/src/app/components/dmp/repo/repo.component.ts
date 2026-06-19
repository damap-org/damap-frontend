import { Component, Input, inject, ChangeDetectionStrategy, input, output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { DataSource } from '../../../domain/enum/data-source.enum';
import { Dataset } from '../../../domain/dataset';
import { LoadingState } from '../../../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../../../domain/repository-details';
import { RepositoryStore } from '../../../data-access/repository.store';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { RetentionPeriodComponent } from './retention-period/retention-period.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { ErrorMessageComponent } from '../../../widgets/error-message/error-message.component';
import { MatTabLabel } from '@angular/material/tabs';
import { RepoRecommendationComponent } from './repo-recommendation/repo-recommendation.component';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { DatasetSourcePipe } from '../../../pipes/dataset-source/dataset-source.pipe';
import { RepoPipe } from './repo.pipe';

@Component({
  selector: 'app-dmp-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
  providers: [RepositoryStore],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatLabel,
    RetentionPeriodComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    ErrorMessageComponent,
    MatTabLabel,
    RepoRecommendationComponent,
    TranslatePipe,
    TranslateDirective,
    MatButton,
    RepoTableComponent,
    DatasetSourcePipe,
    RepoPipe,
  ],
})
export class RepoComponent {
  private readonly store = inject(RepositoryStore);

  readonly dmpForm = input<UntypedFormGroup>(undefined);
  @Input() repoStep: UntypedFormArray;
  @Input() datasets: UntypedFormArray;

  readonly repositoryToAdd = output<any>();
  readonly repositoryToRemove = output<any>();

  readonly datasetSource: any = DataSource;
  readonly LoadingState = LoadingState;

  selectedTabIndex = 0;
  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  readonly recommended = this.store.recommendedRepositories;
  readonly recommendedLoaded = this.store.recommendedRepositoriesLoaded;
  readonly repositories = this.store.repositories;
  readonly repositoriesLoaded = this.store.repositoriesLoaded;
  readonly filters = this.store.filters;

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }

  removeRepository(index: number): void {
    this.repositoryToRemove.emit(index);
  }

  getRepositoryDetails(repo: RepositoryDetails) {
    if (!repo.description) {
      this.store.loadDetails(repo.id);
    }
  }

  filterRepositories(filter: { [key: string]: { id: string; label: string }[] } | null) {
    if (filter) {
      this.store.setFilter(filter);
    } else {
      this.store.setFilter({});
    }
  }

  getDatasetsMarkedForDeletion(index: number): Dataset[] {
    const repo = this.repoStep.at(index);
    return this.datasets.value.filter(
      (item) => item.delete && repo.value.datasets.includes(item.referenceHash),
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
  }
}
