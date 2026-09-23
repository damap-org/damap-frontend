import { Injectable } from '@angular/core';

/**
 * Service to track available languages for the translation management admin panel.
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService {
  private availableLanguages = new Set<string>(['en']);

  registerAvailableLanguage(lang: string): void {
    const normalized = (lang || '').toLowerCase();
    if (normalized) {
      this.availableLanguages.add(normalized);
    }
  }

  removeAvailableLanguage(lang: string): void {
    const normalized = (lang || '').toLowerCase();
    if (normalized) {
      this.availableLanguages.delete(normalized);
    }
  }

  getAvailableLanguages(): string[] {
    return Array.from(this.availableLanguages).sort();
  }
}
