import { Component, OnInit } from '@angular/core';
import {
  LanguageSummary,
  TranslationEntry,
  TranslationUpdatePayload,
} from '../../../domain/translation';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';

import { AddLanguageDialogComponent } from './dialogs/add-language-dialog.component';
import { BackendService } from '../../../services/backend.service';
import { DeleteLanguageDialogComponent } from './dialogs/delete-language-dialog.component';
import { FeedbackService } from '../../../services/feedback.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from '@damap/core';

@Component({
  selector: 'damap-translation-management',
  templateUrl: './translation-management.component.html',
  styleUrl: './translation-management.component.css',
  standalone: false,
})
export class TranslationManagementComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;

  searchControl = new FormControl('');
  sectionFilter = 'all';
  statusFilterControl = new FormControl<'all' | 'default' | 'custom'>('all');

  translations: TranslationEntry[] = [];
  filteredTranslations: TranslationEntry[] = [];
  pagedTranslations: TranslationEntry[] = [];

  sections: string[] = [];
  languages: string[] = [];
  languageActiveMap = new Map<string, boolean>();
  selectedLanguage = 'en';

  selectedTranslation: TranslationEntry | null = null;
  customValue = '';
  originalCustomValue = '';

  loading = false;
  saving = false;
  languageLoading = false;

  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private translationLoader: TranslationLoaderService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.applyFilters(true);
      });

    this.statusFilterControl.valueChanges.subscribe(() => {
      this.applyFilters(true);
    });

    this.backendService.getLanguageDetails().subscribe(details => {
      const list =
        details.length > 0 ? details : [{ language: 'en', active: true }];
      this.applyLanguageDetails(list);
      const currentLang = this.translate.currentLang ?? 'en';
      this.selectedLanguage = this.languages.includes(currentLang)
        ? currentLang
        : this.languages[0];
      this.languages.forEach(l =>
        this.translationLoader.registerAvailableLanguage(l),
      );
      this.loadTranslations(this.selectedLanguage);
    });
  }

  private applyLanguageDetails(details: LanguageSummary[]): void {
    this.languageActiveMap = new Map(
      details.map(d => [d.language, d.active] as const),
    );
    this.languages = [...this.languageActiveMap.keys()].sort();
  }

  get selectedLanguageActive(): boolean {
    return this.languageActiveMap.get(this.selectedLanguage) ?? true;
  }

  get activeLanguageCount(): number {
    let count = 0;
    for (const active of this.languageActiveMap.values()) {
      if (active) count++;
    }
    return count;
  }

  get isRemoveLanguageDisabled(): boolean {
    return (
      this.languageLoading ||
      this.languages.length <= 1 ||
      this.selectedLanguage === 'en'
    );
  }

  get isToggleActiveDisabled(): boolean {
    if (this.languageLoading) return true;
    // Allow activating an inactive language; only block deactivating the last active one.
    if (this.selectedLanguageActive && this.activeLanguageCount <= 1) {
      return true;
    }
    return false;
  }

  get toggleActiveLabelKey(): string {
    return this.selectedLanguageActive
      ? 'admin.appTranslations.deactivateLanguage'
      : 'admin.appTranslations.activateLanguage';
  }

  toggleLanguageActive(): void {
    const language = this.selectedLanguage;
    const nextActive = !this.selectedLanguageActive;
    this.languageLoading = true;
    this.backendService
      .setLanguageActive(language, nextActive)
      .pipe(finalize(() => (this.languageLoading = false)))
      .subscribe({
        next: () => {
          this.languageActiveMap.set(language, nextActive);
          if (nextActive) {
            this.translationLoader.registerAvailableLanguage(language);
          } else {
            this.translationLoader.removeAvailableLanguage(language);
          }
          this.translate.reloadLang(language).subscribe();
          this.feedbackService.success(
            nextActive
              ? 'http.success.translations.language.activate'
              : 'http.success.translations.language.deactivate',
          );
        },
        error: err => {
          const message = err?.error?.message;
          this.feedbackService.error(
            message || 'http.error.translations.language.activate',
          );
        },
      });
  }

  get totalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.filteredTranslations.length / this.pageSize),
    );
  }

  private loadTranslations(language?: string): void {
    const langToLoad = language ?? this.selectedLanguage;

    if (language) {
      this.selectedLanguage = language;
    }

    this.loading = true;
    this.selectedTranslation = null;
    this.customValue = '';
    this.originalCustomValue = '';
    this.translations = [];
    this.sections = [];
    this.backendService
      .getTranslations(langToLoad)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: data => {
          const filteredData = (data ?? []).filter(
            t => (t.language || '').toLowerCase() === langToLoad.toLowerCase(),
          );
          this.translations = filteredData;
          if (this.translations.length > 0) {
            this.translationLoader.registerAvailableLanguage(langToLoad);
            if (!this.languages.includes(langToLoad)) {
              this.languageActiveMap.set(langToLoad, true);
              this.languages = [...this.languages, langToLoad].sort();
            }
          }
          this.sections = Array.from(
            new Set(
              this.translations.map(t => this.sectionForKey(t.translationKey)),
            ),
          ).sort();
          this.applyFilters(true);
        },
        error: err => {
          this.translations = [];
          this.sections = [];
          this.applyFilters(true);
          const message = err?.error?.message;
          this.feedbackService.error(message || 'http.error.translations.load');
        },
      });
  }

  private sectionForKey(key: string): string {
    const [section] = key?.split('.') ?? [];
    return section || 'general';
  }

  isCustomValue(entry: TranslationEntry): boolean {
    return !!entry.value && entry.value.trim().length > 0;
  }

  onSectionChange(section: string): void {
    this.sectionFilter = section;
    this.applyFilters(true);
  }

  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
    this.pageIndex = 0;
    this.translations = [];
    this.sections = [];
    this.selectedTranslation = null;
    this.customValue = '';
    this.originalCustomValue = '';
    this.loadTranslations(language);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  selectTranslation(entry: TranslationEntry): void {
    this.selectedTranslation = entry;
    this.customValue = entry.value ?? '';
    this.originalCustomValue = entry.value ?? '';
  }

  clearSelection(): void {
    this.selectedTranslation = null;
    this.customValue = '';
    this.originalCustomValue = '';
  }

  get hasChanges(): boolean {
    if (!this.selectedTranslation) {
      return false;
    }
    const currentValue = this.customValue ?? '';
    const originalValue = this.originalCustomValue ?? '';
    return currentValue.trim() !== originalValue.trim();
  }

  saveCustomValue(): void {
    if (!this.selectedTranslation || this.saving) {
      return;
    }
    const nextValue =
      this.customValue && this.customValue.trim().length > 0
        ? this.customValue
        : null;
    const payload: TranslationUpdatePayload = {
      id: this.selectedTranslation.id,
      translationKey: this.selectedTranslation.translationKey,
      language: this.selectedTranslation.language,
      active: this.selectedTranslation.active,
      value: nextValue,
    };
    this.saving = true;
    this.backendService
      .updateTranslation(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: updated => {
          this.translations = this.translations.map(t =>
            t.id === updated.id ? updated : t,
          );
          this.applyFilters();
          this.selectedTranslation = updated;
          this.customValue = updated.value ?? '';
          this.originalCustomValue = updated.value ?? '';
          this.translate.reloadLang(this.selectedLanguage).subscribe(() => {
            this.feedbackService.success('http.success.translations.update');
          });
        },
        error: err => {
          const message = err?.error?.message;
          this.feedbackService.error(
            message || 'http.error.translations.update',
          );
        },
      });
  }

  openAddLanguageDialog(): void {
    const dialogRef = this.dialog.open(AddLanguageDialogComponent, {
      width: '420px',
      data: { existing: this.languages },
    });

    dialogRef.afterClosed().subscribe(languageCode => {
      if (!languageCode) {
        return;
      }
      const normalizedCode = languageCode.trim().toLowerCase();
      if (this.languages.includes(normalizedCode)) {
        this.feedbackService.error('admin.appTranslations.languages.exists');
        return;
      }
      this.languageLoading = true;
      this.backendService
        .createLanguage(normalizedCode, { silent: true })
        .pipe(finalize(() => (this.languageLoading = false)))
        .subscribe({
          next: () => {
            this.translationLoader.registerAvailableLanguage(normalizedCode);
            if (!this.languages.includes(normalizedCode)) {
              this.languageActiveMap.set(normalizedCode, true);
              this.languages = [...this.languages, normalizedCode].sort();
            }
            this.translations = [];
            this.sections = [];
            this.selectedLanguage = normalizedCode;
            this.selectedTranslation = null;
            this.customValue = '';
            this.originalCustomValue = '';
            this.loadTranslations(normalizedCode);
            this.feedbackService.success(
              'http.success.translations.language.add',
            );
          },
          error: err => {
            const message = err?.error?.message;
            this.feedbackService.error(
              message || 'http.error.translations.language.create',
            );
          },
        });
    });
  }

  confirmDeleteLanguage(language: string): void {
    if (language === 'en') {
      this.feedbackService.error(
        'admin.appTranslations.languages.cannotDeleteDefault',
      );
      return;
    }

    const dialogRef = this.dialog.open(DeleteLanguageDialogComponent, {
      width: '420px',
      data: { language },
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }
      this.languageLoading = true;
      this.backendService
        .deleteLanguage(language)
        .pipe(finalize(() => (this.languageLoading = false)))
        .subscribe({
          next: () => {
            this.translationLoader.removeAvailableLanguage(language);
            this.languageActiveMap.delete(language);
            this.languages = this.languages.filter(l => l !== language);
            if (this.selectedLanguage === language) {
              this.selectedLanguage = this.languages[0] ?? 'en';
              this.loadTranslations(this.selectedLanguage);
            }
            this.feedbackService.success(
              'http.success.translations.language.delete',
            );
          },
          error: err => {
            const message = err?.error?.message;
            this.feedbackService.error(
              message || 'http.error.translations.language.delete',
            );
          },
        });
    });
  }

  private applyFilters(resetPage = false): void {
    const term = (this.searchControl.value || '').trim().toLowerCase();
    let items = [...this.translations];

    if (term) {
      items = items.filter(item => {
        const searchPool = [
          item.translationKey,
          item.value ?? '',
          item.defaultValue ?? '',
        ]
          .filter(Boolean)
          .map(text => text.toLowerCase());
        return searchPool.some(text => text.includes(term));
      });
    }

    if (this.sectionFilter !== 'all') {
      items = items.filter(
        item => this.sectionForKey(item.translationKey) === this.sectionFilter,
      );
    }

    const statusFilter = this.statusFilterControl.value;
    if (statusFilter === 'custom') {
      items = items.filter(item => this.isCustomValue(item));
    } else if (statusFilter === 'default') {
      items = items.filter(item => !this.isCustomValue(item));
    }

    this.filteredTranslations = items;

    if (resetPage) {
      this.pageIndex = 0;
    } else if (this.pageIndex > this.totalPages - 1) {
      this.pageIndex = Math.max(0, this.totalPages - 1);
    }

    const start = this.pageIndex * this.pageSize;
    this.pagedTranslations = items.slice(start, start + this.pageSize);
  }
}
