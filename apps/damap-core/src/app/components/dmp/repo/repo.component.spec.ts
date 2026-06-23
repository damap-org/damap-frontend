import { signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, type Mock } from 'vitest';

import { RepositoryFilter } from '../../../data-access/repository.api';
import { RepositoryStore } from '../../../data-access/repository.store';
import { LoadingState } from '../../../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../../../domain/repository-details';
import { RepoComponent } from './repo.component';

type RepositoryStoreStub = {
  readonly recommendedRepositories: WritableSignal<RepositoryDetails[]>;
  readonly recommendedRepositoriesLoaded: WritableSignal<LoadingState>;
  readonly repositories: WritableSignal<RepositoryDetails[]>;
  readonly repositoriesLoaded: WritableSignal<LoadingState>;
  readonly filters: WritableSignal<RepositoryFilter>;
  readonly setFilter: Mock<(filter: RepositoryFilter) => void>;
  readonly loadDetails: Mock<(id: string) => void>;
};

function createRepositoryStoreStub(): RepositoryStoreStub {
  return {
    recommendedRepositories: signal<RepositoryDetails[]>([]),
    recommendedRepositoriesLoaded: signal(LoadingState.LOADED),
    repositories: signal<RepositoryDetails[]>([]),
    repositoriesLoaded: signal(LoadingState.LOADED),
    filters: signal<RepositoryFilter>({}),
    setFilter: vi.fn<(filter: RepositoryFilter) => void>(),
    loadDetails: vi.fn<(id: string) => void>(),
  };
}

describe('RepoComponent', () => {
  async function createComponent() {
    const store = createRepositoryStoreStub();

    await TestBed.configureTestingModule({
      imports: [RepoComponent],
    })
      .overrideComponent(RepoComponent, {
        set: {
          template: '',
          providers: [{ provide: RepositoryStore, useValue: store }],
        },
      })
      .compileComponents();

    const fixture = TestBed.createComponent(RepoComponent);
    await fixture.whenStable();

    return {
      component: fixture.componentInstance,
      store,
    };
  }

  it('coordinates repository filtering and detail loading through the store', async () => {
    const { component, store } = await createComponent();
    const filter: RepositoryFilter = {
      subject: [{ id: 'physics', label: 'Physics' }],
    };

    component.filterRepositories(filter);
    component.filterRepositories(null);
    component.getRepositoryDetails({ id: 'zenodo', name: 'Zenodo' });
    component.getRepositoryDetails({
      id: 'dryad',
      name: 'Dryad',
      description: 'Already loaded',
    });

    expect(store.setFilter).toHaveBeenNthCalledWith(1, filter);
    expect(store.setFilter).toHaveBeenNthCalledWith(2, {});
    expect(store.loadDetails).toHaveBeenCalledOnce();
    expect(store.loadDetails).toHaveBeenCalledWith('zenodo');
  });
});
