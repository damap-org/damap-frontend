import { computed, effect, inject, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { InternalStorage } from '../domain/internal-storage';
import { SearchResult } from '../domain/search/search-result';
import { InternalStorageApi } from './internal-storage.api';
import { handleError } from '@damap-frontend-core';

@Injectable({ providedIn: 'root' })
export class InternalStorageStore {
  private readonly api = inject(InternalStorageApi);

  private readonly internalStoragesResource = httpResource<SearchResult<InternalStorage>>(
    () => this.api.baseUrl,
  );

  readonly internalStorages = computed<InternalStorage[]>(() => {
    const resource = this.internalStoragesResource;
    return resource.hasValue() ? resource.value().items : [];
  });

  readonly loading = computed(() => this.internalStoragesResource.isLoading());

  private readonly errorEffect = effect(() => {
    const error = this.internalStoragesResource.error();

    if (error) {
      handleError();
    }
  });
}
