import { BackendTranslateLoader } from '@damap/core';
import { environment } from '../environments/environment';

// required for AOT compilation
export function HttpLoaderFactory(): BackendTranslateLoader {
  return new BackendTranslateLoader(environment.backendurl);
}
