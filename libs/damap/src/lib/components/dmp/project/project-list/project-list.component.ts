import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';

import { BackendService } from '../../../../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Project } from '../../../../domain/project';
import { SearchResult } from '../../../../domain/search/search-result';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  standalone: false,
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  @Output() projectToSet = new EventEmitter<Project>();
  private _selectedProject: Project;

  @Input()
  get selectedProject(): Project {
    return this._selectedProject;
  }

  set selectedProject(project: Project) {
    this._selectedProject = project;
    if (project === null) {
      this.fetchRecommendedProjects();
    }
  }

  private searchTerms = new Subject<string>();
  searchResult$: Observable<SearchResult<Project>>;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged((previous, current) => {
          if (previous === null && current === null) {
            // search for recommended projects
            return false;
          }
          return previous === current;
        }),
        switchMap((term: string) =>
          term === null || term.length === 0
            ? this.backendService.getRecommendedProjects()
            : this.backendService.getProjectSearchResult(term),
        ),
      )
      .subscribe(results => (this.searchResult$ = of(results)));
  }

  ngAfterViewInit(): void {
    this.fetchRecommendedProjects();
  }

  fetchRecommendedProjects(): void {
    this.search(null);
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  changeProject(event: MatSelectionListChange): void {
    this.projectToSet.emit(event.source.selectedOptions.selected[0]?.value);
  }
}
