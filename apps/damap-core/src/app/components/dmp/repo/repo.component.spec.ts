import { Component, input, output, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { vi, it, describe, expect } from 'vitest';

import { RepoComponent } from './repo.component';
import { RepositoryStore } from '../../../data-access/repository.store';
import { RepositoryFilter } from '../../../data-access/repository.api';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { LoadingState } from '../../../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../../../domain/repository-details';
import { RepoRecommendationComponent } from './repo-recommendation/repo-recommendation.component';
import { RepoTableComponent } from './repo-table/repo-table.component';

@Component({ selector: 'app-repo-recommendation', template: '' })
class RepoRecommendationStubComponent {
  readonly recommended = input<RepositoryDetails[]>();
  readonly loaded = input<LoadingState>();
  readonly repositoryToAdd = output<RepositoryDetails>();
}

@Component({ selector: 'app-repo-table', template: '' })
class RepoTableStubComponent {
  readonly loaded = input<LoadingState>();
  readonly filters = input<RepositoryFilter>();
  readonly repositories = input<RepositoryDetails[]>();
  readonly selectedRepos = input<unknown>();
  readonly filterChange = output<RepositoryFilter>();
  readonly repositoryToAdd = output<RepositoryDetails>();
  readonly repositoryDetails = output<RepositoryDetails>();
}

/**
 * Minimal fake of the signal-based RepositoryStore. The component only reads the
 * store's signals and calls `setFilter`/`loadDetails`, so writable signals let
 * each test drive the rendered state without any HTTP / httpResource wiring.
 */
function createStoreStub() {
  return {
    recommendedRepositories: signal<RepositoryDetails[]>([]),
    recommendedRepositoriesLoaded: signal<LoadingState>(LoadingState.LOADED),
    repositories: signal<RepositoryDetails[]>([]),
    repositoriesLoaded: signal<LoadingState>(LoadingState.LOADED),
    filters: signal<RepositoryFilter>({}),
    setFilter: vi.fn(),
    loadDetails: vi.fn(),
  };
}

describe('RepoComponent', () => {
  async function createComponent() {
    const store = createStoreStub();

    await TestBed.configureTestingModule({
      imports: [RepoComponent, TranslateTestingModule],
    })
      .overrideComponent(RepoComponent, {
        remove: { imports: [RepoRecommendationComponent, RepoTableComponent] },
        add: {
          imports: [RepoRecommendationStubComponent, RepoTableStubComponent],
          providers: [{ provide: RepositoryStore, useValue: store }],
        },
      })
      .compileComponents();

    const fixture = TestBed.createComponent(RepoComponent);
    fixture.componentRef.setInput(
      'dmpForm',
      new UntypedFormGroup({ repositories: new UntypedFormArray([]) }),
    );
    fixture.componentRef.setInput('repoStep', new UntypedFormArray([]));
    fixture.componentRef.setInput('datasets', new UntypedFormArray([]));
    await fixture.whenStable();

    return { fixture, component: fixture.componentInstance, store };
  }

  it('creates the component', async () => {
    const { component } = await createComponent();

    expect(component).toBeTruthy();
  });

  it('feeds the recommendation view from the store in the primary view', async () => {
    const { fixture, store } = await createComponent();
    const recommended: RepositoryDetails[] = [{ id: 'r1', name: 'Zenodo' }];

    store.recommendedRepositories.set(recommended);
    await fixture.whenStable();

    const recommendation = fixture.debugElement.query(
      By.directive(RepoRecommendationStubComponent),
    );
    expect(recommendation).not.toBeNull();
    expect(recommendation.componentInstance.recommended()).toEqual(recommended);
    expect(recommendation.componentInstance.loaded()).toBe(LoadingState.LOADED);
  });

  it('toggles between the primary and secondary views', async () => {
    const { component } = await createComponent();

    expect(component.selectedView).toBe('primaryView');

    component.onViewChange('secondaryView');
    expect(component.selectedView).toBe('secondaryView');

    component.onViewChange('primaryView');
    expect(component.selectedView).toBe('primaryView');
  });

  it('emits the repository to add', async () => {
    const { component } = await createComponent();
    const repo: RepositoryDetails = { id: 'r1', name: 'Zenodo' };
    const emitted: RepositoryDetails[] = [];
    component.repositoryToAdd.subscribe((value) => emitted.push(value));

    component.addRepository(repo);

    expect(emitted).toEqual([repo]);
  });

  it('emits the index of the repository to remove', async () => {
    const { component } = await createComponent();
    const emitted: number[] = [];
    component.repositoryToRemove.subscribe((value) => emitted.push(value));

    component.removeRepository(2);

    expect(emitted).toEqual([2]);
  });

  it('forwards active and cleared filters to the store', async () => {
    const { component, store } = await createComponent();
    const filter: RepositoryFilter = {
      subject: [{ id: '1', label: 'Physics' }],
    };

    component.filterRepositories(filter);
    expect(store.setFilter).toHaveBeenCalledWith(filter);

    component.filterRepositories(null);
    expect(store.setFilter).toHaveBeenLastCalledWith({});
  });

  it('only loads details for repositories that are not yet detailed', async () => {
    const { component, store } = await createComponent();

    component.getRepositoryDetails({ id: 'r1', name: 'Zenodo' });
    expect(store.loadDetails).toHaveBeenCalledWith('r1');

    store.loadDetails.mockClear();
    component.getRepositoryDetails({
      id: 'r2',
      name: 'Dryad',
      description: 'already loaded',
    });
    expect(store.loadDetails).not.toHaveBeenCalled();
  });
});
