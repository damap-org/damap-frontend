import { Injectable } from '@angular/core';

/**
 *
 * TODO for Backend :
 * The frontend currently uses this mock service as a fallback when:
 * 1. POST /api/translations/languages/{languageCode} fails (e.g., EntityExistsException)
 * 2. DELETE /api/translations/languages/{languageCode} fails
 *
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationMockService {
  private mockLanguages = new Set<string>();

  addMockLanguage(languageCode: string): void {
    const normalized = (languageCode || '').toLowerCase();
    if (normalized) {
      this.mockLanguages.add(normalized);
    }
  }

  removeMockLanguage(languageCode: string): void {
    const normalized = (languageCode || '').toLowerCase();
    if (normalized) {
      this.mockLanguages.delete(normalized);
    }
  }

  isMockLanguage(languageCode: string): boolean {
    const normalized = (languageCode || '').toLowerCase();
    return this.mockLanguages.has(normalized);
  }

  getMockLanguages(): string[] {
    return Array.from(this.mockLanguages);
  }
}
