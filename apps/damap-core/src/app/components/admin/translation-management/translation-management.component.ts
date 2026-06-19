import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from '../../../services/translation-loader.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInput } from '@angular/material/input';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'damap-translation-management',
  templateUrl: './translation-management.component.html',
  styleUrl: './translation-management.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatTooltip,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatPaginator,
    UpperCasePipe,
    TranslatePipe,
  ],
})
export class TranslationManagementComponent implements OnInit {
  private backendService = inject(BackendService);
  private feedbackService = inject(FeedbackService);
  private dialog = inject(MatDialog);
  private translationLoader = inject(TranslationLoaderService);
  private translate = inject(TranslateService);

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
      const currentLang = this.translate.getCurrentLang() ?? 'en';
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

  get toggleActiveDisabledTooltipKey(): string {
    if (!this.isToggleActiveDisabled || this.languageLoading) return '';
    return 'admin.appTranslations.deactivateLanguageDisabledLastActive';
  }

  get removeLanguageDisabledTooltipKey(): string {
    if (!this.isRemoveLanguageDisabled || this.languageLoading) return '';
    if (this.selectedLanguage === 'en') {
      return 'admin.appTranslations.removeLanguageDisabledEnglish';
    }
    return '';
  }

  toggleLanguageActive(): void {
    const nextActive = !this.selectedLanguageActive;
    this.languageLoading = true;
    this.backendService
      .setLanguageActive(this.selectedLanguage, nextActive)
      .pipe(finalize(() => (this.languageLoading = false)))
      .subscribe({
        next: () => {
          this.feedbackService.success(
            nextActive
              ? 'http.success.translations.language.activate'
              : 'http.success.translations.language.deactivate',
          );
          window.location.reload();
        },
        error: err => {
          const message = err?.error?.message;
          this.feedbackService.error(
            message ||
              (nextActive
                ? 'http.error.translations.language.activate'
                : 'http.error.translations.language.deactivate'),
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
    return !!entry.custom && entry.custom.trim().length > 0;
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
    this.customValue = entry.custom ?? '';
    this.originalCustomValue = entry.custom ?? '';
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
    const currentCustom = this.customValue ?? '';
    const originalCustom = this.originalCustomValue ?? '';
    return currentCustom.trim() !== originalCustom.trim();
  }

  revertToDefault(): void {
    if (!this.selectedTranslation || this.saving) {
      return;
    }
    this.customValue = null;
    this.saveCustomValue();
  }

  saveCustomValue(): void {
    if (!this.selectedTranslation || this.saving) {
      return;
    }
    const nextCustom =
      this.customValue && this.customValue.trim().length > 0
        ? this.customValue
        : null;
    const payload: TranslationUpdatePayload = {
      id: this.selectedTranslation.id,
      translationKey: this.selectedTranslation.translationKey,
      language: this.selectedTranslation.language,
      active: this.selectedTranslation.active,
      custom: nextCustom,
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
          this.customValue = updated.custom ?? '';
          this.originalCustomValue = updated.custom ?? '';
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
            this.translate.use(normalizedCode);
            this.feedbackService.success(
              'http.success.translations.language.add',
            );
            window.location.reload();
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
    const dialogRef = this.dialog.open(DeleteLanguageDialogComponent, {
      width: '420px',
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
            if (this.translate.getCurrentLang() === language) {
              this.translate.use('en');
            }
            this.feedbackService.success(
              'http.success.translations.language.delete',
            );
            window.location.reload();
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
          item.custom ?? '',
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
