import {
  computed,
  inject,
  Injectable,
  type ResourceStatus,
  signal,
} from '@angular/core';
import { httpResource } from '@angular/common/http';

import { LoadingState } from '../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../domain/repository-details';
import { RepositoryApi, RepositoryFilter } from './repository.api';

function hasActiveFilters(filter: RepositoryFilter): boolean {
  return Object.keys(filter).some(key => filter[key]?.length > 0);
}

@Injectable()
export class RepositoryStore {
  private readonly api = inject(RepositoryApi);

  private readonly filterState = signal<RepositoryFilter>({});
  private readonly detailId = signal<string | null>(null);

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

  private readonly repositoryDetailResource = httpResource<RepositoryDetails>(
    () => {
      const id = this.detailId();
      return id ? this.api.byId(id) : undefined;
    },
  );

  readonly recommendedRepositories = computed(() =>
    this.recommendedRepositoriesResource.value(),
  );
  readonly repositories = computed(() => {
    const detail = this.repositoryDetailResource.value();

    return this.repositoriesResource.value().map(repository => {
      return detail?.id === repository.id ? detail : repository;
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
    const detail = this.repositoryDetailResource.value();
    if (detail?.id === id) {
      return;
    }

    this.detailId.set(id);
  }

  private toLoadingState(status: ResourceStatus): LoadingState {
    switch (status) {
      case 'error':
        return LoadingState.FAILED;
      case 'loading':
      case 'reloading':
        return LoadingState.LOADING;
      case 'resolved':
      case 'local':
        return LoadingState.LOADED;
      case 'idle':
        return LoadingState.NOT_LOADED;
      default:
        return LoadingState.NOT_LOADED;
    }
  }
}
