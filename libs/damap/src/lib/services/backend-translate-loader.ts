import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslationEntry } from '../domain/translation';
import { inject } from '@angular/core';

export class BackendTranslateLoader implements TranslateLoader {
  private static readonly landingFallbackTranslations: Record<string, string> =
    {
      'landing.servers-down':
        'Our servers seem to be down at the moment. Please try again later.',
      'landing.servers-down-retrying':
        'Failed to establish connection to our servers. Retrying...',
      'landing.servers-up':
        'Connection to our servers has been re-established.',
      'landing.introduction': 'Introduction',
      'landing.start': 'Start now',
      'landing.title': 'DAMAP - a tool for machine actionable DMPs',
    };

  private httpClient = inject(HttpClient);

  constructor(private readonly backendUrl: string) {}

  getTranslation(lang: string): Observable<Record<string, any>> {
    return this.httpClient
      .get<TranslationEntry[]>(`${this.backendUrl}languages/${lang}`)
      .pipe(
        map(entries =>
          this.withLandingFallbackTranslations(this.entriesToNested(entries)),
        ),
        catchError(() => of(this.withLandingFallbackTranslations({}))),
      );
  }

  private entriesToNested(entries: TranslationEntry[]): Record<string, any> {
    const result: Record<string, any> = {};
    for (const entry of entries) {
      const custom = entry.active
        ? entry.custom || entry.defaultValue
        : entry.custom;
      if (!custom) continue;
      this.setNestedValue(result, entry.translationKey, custom);
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

  private withLandingFallbackTranslations(
    translations: Record<string, any>,
  ): Record<string, any> {
    for (const [key, value] of Object.entries(
      BackendTranslateLoader.landingFallbackTranslations,
    )) {
      if (!this.hasNestedValue(translations, key)) {
        this.setNestedValue(translations, key, value);
      }
    }
    return translations;
  }

  private hasNestedValue(obj: Record<string, any>, key: string): boolean {
    const parts = key.split('.');
    let current: any = obj;
    for (const part of parts) {
      if (
        typeof current !== 'object' ||
        current === null ||
        !Object.prototype.hasOwnProperty.call(current, part)
      ) {
        return false;
      }
      current = current[part];
    }
    return true;
  }
}
