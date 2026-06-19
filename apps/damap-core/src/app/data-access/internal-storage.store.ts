import { computed, inject, Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { InternalStorage } from '../domain/internal-storage';
import { SearchResult } from '../domain/search/search-result';
import { InternalStorageApi } from './internal-storage.api';

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
  readonly error = computed(() => this.internalStoragesResource.error());

  reload(): void {
    this.internalStoragesResource.reload();
  }
}
