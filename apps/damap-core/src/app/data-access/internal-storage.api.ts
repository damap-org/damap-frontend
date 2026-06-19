import { Injectable } from '@angular/core';

import { APP_ENV } from '../constants';

@Injectable({ providedIn: 'root' })
export class InternalStorageApi {
  readonly baseUrl = `${APP_ENV.backendurl}storages`;
}
