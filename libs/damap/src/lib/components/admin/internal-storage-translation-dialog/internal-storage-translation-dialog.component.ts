import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { FormService } from '../../../services/form.service';
import { InternalStorageTranslation } from '../../../domain/internal-storage';
import {
  LANGUAGE_CODE_OPTIONS,
  LanguageCodeOption,
} from '../../../domain/language-codes';

@Component({
  selector: 'internal-storage-translation-dialog',
  templateUrl: './internal-storage-translation-dialog.component.html',
  styleUrl: './internal-storage-translation-dialog.component.css',
  standalone: false,
})
export class InternalStorageTranslationDialogComponent {
  public mode = 'add';
  storageTranslation: UntypedFormGroup;

  readonly languageOptions = LANGUAGE_CODE_OPTIONS;
  readonly filteredLanguageOptions$: Observable<LanguageCodeOption[]>;

  constructor(
    public dialogRef: MatDialogRef<InternalStorageTranslationDialogComponent>,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      storageId: number;
      translation: InternalStorageTranslation;
      mode: string;
    },
  ) {
    this.storageTranslation =
      this.formService.createInternalStorageTranslationFormGroup();

    if (data.translation) {
      this.storageTranslation.patchValue({
        ...data.translation,
        languageCode: this.normalizeLegacyLanguageCode(
          data.translation.languageCode,
        ),
      });
    }

    this.storageTranslation.get('storageId')?.setValue(data.storageId);

    this.languageCode.addValidators([
      Validators.required,
      Validators.pattern(/^[a-z]{2}$/i),
      this.validLanguageCodeValidator.bind(this),
    ]);

    this.languageCode.updateValueAndValidity();

    this.filteredLanguageOptions$ = this.languageCode.valueChanges.pipe(
      startWith(this.languageCode.value ?? ''),
      map(value => this.filterLanguageOptions(value ?? '')),
    );

    this.mode = data.mode ?? this.mode;
  }

  get languageCode(): UntypedFormControl {
    return this.storageTranslation.get('languageCode') as UntypedFormControl;
  }

  get title(): UntypedFormControl {
    return this.storageTranslation.get('title') as UntypedFormControl;
  }

  get description(): UntypedFormControl {
    return this.storageTranslation.get('description') as UntypedFormControl;
  }

  get backupFrequency(): UntypedFormControl {
    return this.storageTranslation.get('backupFrequency') as UntypedFormControl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose(): void {
    if (this.storageTranslation.invalid) {
      this.storageTranslation.markAllAsTouched();
      return;
    }

    const newTranslation = {
      ...this.storageTranslation.value,
      id: this.data.translation?.id,
      languageCode: (this.storageTranslation.value.languageCode as string)
        .trim()
        .toLowerCase(),
    };

    this.dialogRef.close(newTranslation);
  }

  getLanguageDisplayValue(code: string): string {
    const normalizedCode = this.normalizeLegacyLanguageCode(code);

    if (!normalizedCode) {
      return '';
    }

    const language = this.languageOptions.find(
      option => option.code === normalizedCode,
    );

    return language
      ? `${language.name} (${language.code.toUpperCase()})`
      : code;
  }

  private filterLanguageOptions(value: string): LanguageCodeOption[] {
    const normalizedValue = value.trim().toLowerCase();

    if (!normalizedValue) {
      return this.languageOptions;
    }

    return this.languageOptions.filter(option => {
      const displayValue =
        `${option.name} (${option.code.toUpperCase()})`.toLowerCase();

      return (
        option.code.includes(normalizedValue) ||
        option.name.toLowerCase().includes(normalizedValue) ||
        displayValue.includes(normalizedValue)
      );
    });
  }

  private validLanguageCodeValidator(): { invalidLanguageCode: true } | null {
    const value = this.languageCode?.value as string | undefined;

    if (!value) {
      return null;
    }

    const normalizedValue = this.normalizeLegacyLanguageCode(value);

    const exists = this.languageOptions.some(
      option => option.code === normalizedValue,
    );

    return exists ? null : { invalidLanguageCode: true };
  }

  private normalizeLegacyLanguageCode(
    languageCode: string | undefined,
  ): string {
    const normalized = (languageCode ?? '').trim().toLowerCase();

    if (normalized === 'eng') {
      return 'en';
    }

    if (normalized === 'deu') {
      return 'de';
    }

    return normalized;
  }
}
