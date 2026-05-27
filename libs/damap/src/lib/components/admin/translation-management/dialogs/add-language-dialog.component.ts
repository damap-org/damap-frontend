import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import {
  LANGUAGE_CODE_OPTIONS,
  LanguageCodeOption,
} from '../../../../domain/language-codes';

@Component({
  selector: 'damap-add-language-dialog',
  templateUrl: './add-language-dialog.component.html',
  styleUrl: './add-language-dialog.component.css',
  standalone: false,
})
export class AddLanguageDialogComponent {
  readonly form: FormGroup;
  readonly languageOptions = LANGUAGE_CODE_OPTIONS;
  readonly filteredLanguageOptions$: Observable<LanguageCodeOption[]>;

  constructor(
    private dialogRef: MatDialogRef<AddLanguageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { existing: string[] },
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      language: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z]{2}$/i),
          this.validLanguageCodeValidator.bind(this),
          this.languageNotAlreadyExistingValidator.bind(this),
        ],
      ],
    });

    this.filteredLanguageOptions$ =
      this.form.controls.language.valueChanges.pipe(
        startWith(''),
        map(value => this.filterLanguageOptions(value ?? '')),
      );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = (this.form.value.language as string).trim().toLowerCase();
    this.dialogRef.close(value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getLanguageDisplayValue(code: string): string {
    const normalizedCode = (code ?? '').trim().toLowerCase();

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
        option.code.toLowerCase().includes(normalizedValue) ||
        option.name.toLowerCase().includes(normalizedValue) ||
        displayValue.includes(normalizedValue)
      );
    });
  }

  private validLanguageCodeValidator(): { invalidLanguageCode: true } | null {
    const value = this.form?.controls.language.value as string | undefined;

    if (!value) {
      return null;
    }

    const normalizedValue = value.trim().toLowerCase();
    const exists = this.languageOptions.some(
      option => option.code === normalizedValue,
    );

    return exists ? null : { invalidLanguageCode: true };
  }

  private languageNotAlreadyExistingValidator(): {
    languageAlreadyExists: true;
  } | null {
    const value = this.form?.controls.language.value as string | undefined;

    if (!value) {
      return null;
    }

    const normalizedValue = value.trim().toLowerCase();
    const existing = this.data.existing ?? [];

    return existing.map(code => code.toLowerCase()).includes(normalizedValue)
      ? { languageAlreadyExists: true }
      : null;
  }
}
