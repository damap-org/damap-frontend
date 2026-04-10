import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  merge,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

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
export class ProjectListComponent implements OnInit, OnDestroy {
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
  private recommendedProjects$: Observable<SearchResult<Project>>;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private searchResultSubscription: Subscription;
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  searchResult$: Observable<SearchResult<Project>> = of({
    items: [],
  } as SearchResult<Project>);

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
  ) {
    this.recommendedProjects$ = this.backendService
      .getRecommendedProjects()
      .pipe(
        catchError(error => {
          console.error('Error fetching recommended projects:', error);
          return of({ items: [] } as SearchResult<Project>);
        }),
      );
  }

  ngOnInit(): void {
    const debouncedSearchTerms$ = this.searchTerms.pipe(debounceTime(300));

    this.searchResult$ = merge(of(null), debouncedSearchTerms$).pipe(
      distinctUntilChanged((previous, current) => {
        const prevIsEmpty =
          previous === null || previous === undefined || previous === '';
        const currIsEmpty =
          current === null || current === undefined || current === '';
        if (prevIsEmpty && currIsEmpty) {
          return true;
        }
        return previous === current;
      }),
      switchMap((term: string) => {
        this.loadingSubject.next(true);
        const normalizedTerm =
          term === null ||
          term === undefined ||
          (typeof term === 'string' && term.trim().length === 0)
            ? null
            : term;

        if (normalizedTerm === null) {
          return this.recommendedProjects$.pipe(
            finalize(() => this.loadingSubject.next(false)),
          );
        }
        return this.backendService.getProjectSearchResult(normalizedTerm).pipe(
          catchError(error => {
            console.error('Error searching projects:', error);
            return of({ items: [] } as SearchResult<Project>);
          }),
          finalize(() => this.loadingSubject.next(false)),
        );
      }),
      shareReplay(1),
    );

    this.searchResultSubscription = this.searchResult$.subscribe();
  }

  ngOnDestroy(): void {
    this.searchResultSubscription?.unsubscribe();
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
