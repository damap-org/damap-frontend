import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageComponent } from '../../../../widgets/error-message/error-message.component';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-repo-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
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
    TranslateModule,
    ErrorMessageComponent,
    KeyValuePipe,
  ],
})
export class RepoTableComponent implements OnChanges, AfterViewInit {
  @Input() selectedRepos: Repository[];
  @Input() loaded: LoadingState;
  @Input() filters: { [key: string]: { id: string; label: string }[] } = {};
  @Input() repositories: RepositoryDetails[]; // Repo list loaded from backend
  repoList: any = []; // Filtered repo list (repo list minus selected repos)

  @Output() repositoryToAdd = new EventEmitter<any>();
  @Output() repositoryDetails = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<{
    [key: string]: { id: string; label: string }[];
  }>();

  readonly LoadingState = LoadingState;
  readonly tableHeaders: string[] = ['expand', 'title', 'add'];
  expandedElement: string | null;
  dataSource = new MatTableDataSource<RepositoryDetails>();
  input: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filtersActive = () => this.filters && Object.keys(this.filters).length > 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.repositories || changes.selectedRepos) {
      // Timeout needed for paginator init
      setTimeout(_ => this.filterRepos(), 1);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  expandRow(repo: RepositoryDetails) {
    this.expandedElement = this.expandedElement === repo.id ? null : repo.id;
    if (!repo.description) {
      this.getRepoDetails(repo);
    }
  }

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }

  // Table Search Filter
  applyFilter(filterValue: string) {
    this.input = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getRepoDetails(repo: RepositoryDetails) {
    this.repositoryDetails.emit(repo);
  }

  // Filter selected repos from repo list
  private filterRepos(): void {
    this.repoList = Object.assign([], this.repositories);
    for (const entry of this.selectedRepos) {
      this.repoList = this.repoList.filter(e => e.id !== entry.repositoryId);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.repoList;
  }

  onFilterChange(filter: { [key: string]: { id: string; label: string }[] }) {
    this.filterChange.emit(filter);
  }

  resetFilter() {
    this.filterChange.emit(null);
  }
}
