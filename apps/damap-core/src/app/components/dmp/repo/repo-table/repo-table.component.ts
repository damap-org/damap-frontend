import { Component, ViewChild, input, output, computed, effect, inject } from '@angular/core';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { RepositoryDetails } from '../../../../domain/repository-details';
import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Repository } from '../../../../domain/repository';
import { MatCard, MatCardContent } from '@angular/material/card';
import { SearchFieldComponent } from '../../../../shared/search-field/search-field.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RepoFilterComponent } from '../repo-filter/repo-filter.component';
import { TagComponent } from '../../../../widgets/tag/tag.component';
import { MatDivider } from '@angular/material/divider';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { ErrorMessageComponent } from '../../../../widgets/error-message/error-message.component';
import { KeyValuePipe } from '@angular/common';
import { RepositoryStore } from '@damap-frontend-core/app/data-access/repository.store';

@Component({
  selector: 'app-repo-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.css'],
  providers: [RepositoryStore],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    MatCard,
    MatCardContent,
    SearchFieldComponent,
    MatButton,
    MatIcon,
    RepoFilterComponent,
    TagComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatDivider,
    RepoDetailsComponent,
    MatProgressBar,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator,
    TranslatePipe,
    TranslateDirective,
    ErrorMessageComponent,
    KeyValuePipe,
  ],
})
export class RepoTableComponent {
  private readonly store = inject(RepositoryStore);
  readonly selectedRepos = input<Repository[]>(undefined);
  readonly loaded = this.store.repositoriesLoaded;
  readonly filters = this.store.filters;
  readonly repositories = this.store.repositories; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)

  readonly repositoryToAdd = output<any>();

  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: string | null;
  dataSource = new MatTableDataSource<RepositoryDetails>();
  input: string = ''; // TODO: Refactor using signal or model

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator | undefined) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  filtersActive = computed(() => Object.keys(this.filters()).length > 0);

  private readonly syncRepositories = effect(() => {
    const repositories = this.repositories();
    const selectedRepos = this.selectedRepos();

    this.repoList = repositories.filter(
      (repo) => !selectedRepos.some((selected) => selected.repositoryId === repo.id),
    );

    this.dataSource.data = this.repoList;
  });

  expandRow(repo: RepositoryDetails) {
    this.expandedElement = this.expandedElement === repo.id ? null : repo.id;
    if (!repo.description) {
      this.getRepoDetails(repo);
    }
  }

  getRepoDetails(repo: RepositoryDetails) {
    if (!repo.description) {
      this.store.loadDetails(repo.id);
    }
  }

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }

  // Table Search Filter
  applySearch(searchValue: string) {
    this.input = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFilterChange(filter: { [key: string]: { id: string; label: string }[] }) {
    if (filter) {
      this.store.setFilter(filter);
    } else {
      this.store.setFilter({});
    }
  }

  resetFilter() {
    this.store.setFilter({});
  }

  protected readonly LoadingState = LoadingState;
}
