import { TranslateLoader } from '@ngx-translate/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslationEntry } from '../domain/translation';
import { inject } from '@angular/core';

export class BackendTranslateLoader implements TranslateLoader {
  private httpClient = inject(HttpClient);

  constructor(private readonly backendUrl: string) {}

  getTranslation(lang: string): Observable<Record<string, any>> {
    return this.httpClient
      .get<TranslationEntry[]>(`${this.backendUrl}languages/${lang}`)
      .pipe(
        map(entries => this.entriesToNested(entries)),
        catchError(() => of({})),
      );
  }

  private entriesToNested(entries: TranslationEntry[]): Record<string, any> {
    const result: Record<string, any> = {};
    for (const entry of entries) {
      const value = entry.active
        ? entry.value || entry.defaultValue
        : entry.value; // inactive language: only show custom value; missing value falls back to raw key
      if (!value) continue;
      this.setNestedValue(result, entry.translationKey, value);
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
}
