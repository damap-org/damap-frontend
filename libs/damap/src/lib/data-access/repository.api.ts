import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APP_ENV } from '../constants';

export type RepositoryFilter = {
  [key: string]: { id: string; label: string }[];
};

@Injectable({ providedIn: 'root' })
export class RepositoryApi {
  private readonly baseUrl = `${APP_ENV.backendurl}repositories`;

  readonly all = this.baseUrl;
  readonly recommended = `${this.baseUrl}/recommended`;
  readonly search = `${this.baseUrl}/search`;

  byId(id: string): string {
    return `${this.baseUrl}/${id}`;
  }

  searchParams(filter: RepositoryFilter): HttpParams {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key]?.forEach(item => (params = params.append(key, item.id)));
    }
    return params;
  }
}
