import {
  computed,
  inject,
  Injectable,
  ResourceStatus,
  signal,
} from '@angular/core';
import { httpResource, HttpClient } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';

import { LoadingState } from '../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../domain/repository-details';
import { RepositoryApi, RepositoryFilter } from './repository.api';

function hasActiveFilters(filter: RepositoryFilter): boolean {
  return Object.keys(filter).some(key => filter[key]?.length > 0);
}

@Injectable()
export class RepositoryStore {
  private readonly api = inject(RepositoryApi);
  private readonly http = inject(HttpClient);

  private readonly filterState = signal<RepositoryFilter>({});
  private readonly repositoryDetails = signal<
    Record<string, RepositoryDetails>
  >({});

  private readonly recommendedRepositoriesResource = httpResource<
    RepositoryDetails[]
  >(() => this.api.recommended, { defaultValue: [] });

  private readonly repositoriesResource = httpResource<RepositoryDetails[]>(
    () => {
      const filter = this.filterState();
      if (filter && hasActiveFilters(filter)) {
        return {
          url: this.api.search,
          params: this.api.searchParams(filter),
        };
      }

      return {
        url: this.api.all,
      };
    },
    { defaultValue: [] },
  );

  readonly recommendedRepositories = computed(() =>
    this.recommendedRepositoriesResource.value(),
  );
  readonly repositories = computed(() => {
    const details = this.repositoryDetails();

    return this.repositoriesResource.value().map(repository => {
      return details[repository.id] ?? repository;
    });
  });

  readonly filters = this.filterState.asReadonly();

  readonly recommendedRepositoriesLoaded = computed(() =>
    this.toLoadingState(this.recommendedRepositoriesResource.status()),
  );
  readonly repositoriesLoaded = computed(() =>
    this.toLoadingState(this.repositoriesResource.status()),
  );

  readonly recommendedRepositoriesError = computed(() =>
    this.recommendedRepositoriesResource.error(),
  );
  readonly repositoriesError = computed(() =>
    this.repositoriesResource.error(),
  );

  setFilter(filter: RepositoryFilter): void {
    this.filterState.set(filter);
  }

  loadAll(): void {
    this.filterState.set({});
  }

  loadDetails(id: string): void {
    if (this.repositoryDetails()[id]) {
      return;
    }

    this.http
      .get<RepositoryDetails>(this.api.byId(id))
      .pipe(catchError(() => EMPTY))
      .subscribe(repository => {
        this.repositoryDetails.update(details => ({
          ...details,
          [id]: repository,
        }));
      });
  }

  private toLoadingState(status: ResourceStatus): LoadingState {
    switch (status) {
      case ResourceStatus.Error:
        return LoadingState.FAILED;
      case ResourceStatus.Loading:
      case ResourceStatus.Reloading:
        return LoadingState.LOADING;
      case ResourceStatus.Resolved:
      case ResourceStatus.Local:
        return LoadingState.LOADED;
      case ResourceStatus.Idle:
        return LoadingState.NOT_LOADED;
      default:
        return LoadingState.NOT_LOADED;
    }
  }
}
