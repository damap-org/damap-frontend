import { TranslateLoader } from '@ngx-translate/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslationEntry } from '../domain/translation';

export class BackendTranslateLoader implements TranslateLoader {
  private readonly httpClient: HttpClient;
  private readonly jsonLoader: MultiTranslateHttpLoader;

  constructor(
    http: HttpBackend,
    private readonly backendUrl: string,
    jsonPaths: string[],
  ) {
    this.httpClient = new HttpClient(http);
    this.jsonLoader = new MultiTranslateHttpLoader(http, jsonPaths);
  }

  getTranslation(lang: string): Observable<Record<string, any>> {
    return forkJoin({
      json: this.jsonLoader.getTranslation(lang).pipe(catchError(() => of({}))),
      backend: this.httpClient
        .get<TranslationEntry[]>(`${this.backendUrl}languages/${lang}`)
        .pipe(
          map(entries => this.entriesToNested(entries)),
          catchError(() => of({})),
        ),
    }).pipe(map(({ json, backend }) => this.deepMerge(json, backend)));
  }

  private entriesToNested(entries: TranslationEntry[]): Record<string, any> {
    const result: Record<string, any> = {};
    for (const entry of entries) {
      if (!entry.active) continue;
      const value = entry.value || entry.defaultValue;
      if (!value) continue;
      this.setNestedValue(result, entry.key, value);
    }
    return result;
  }

  private setNestedValue(
    obj: Record<string, any>,
    key: string,
    value: string,
  ): void {
    const parts = key.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (typeof current[parts[i]] !== 'object' || current[parts[i]] === null) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  private deepMerge(
    base: Record<string, any>,
    override: Record<string, any>,
  ): Record<string, any> {
    const result = { ...base };
    for (const key of Object.keys(override)) {
      if (
        typeof override[key] === 'object' &&
        override[key] !== null &&
        typeof result[key] === 'object' &&
        result[key] !== null
      ) {
        result[key] = this.deepMerge(result[key], override[key]);
      } else {
        result[key] = override[key];
      }
    }
    return result;
  }
}
