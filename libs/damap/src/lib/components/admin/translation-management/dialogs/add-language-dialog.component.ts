import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import {
  isValidCode,
  LANGUAGE_CODE_OPTIONS,
  LanguageCodeOption,
} from '../../../../domain/language-codes';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { LanguageCodeInputComponent } from '../../../../shared/language-code-input/language-code-input.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../../testing/translate-testing/translate-testing.module';

@Component({
    selector: 'damap-add-language-dialog',
    templateUrl: './add-language-dialog.component.html',
    styleUrl: './add-language-dialog.component.css',
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        LanguageCodeInputComponent,
        MatDialogActions,
        MatButton,
        TranslateModule,
        TranslatePipeMock,
    ],
})
export class AddLanguageDialogComponent {
  readonly form: FormGroup;

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
          this.validLanguageCodeValidator.bind(this),
          this.languageNotAlreadyExistingValidator.bind(this),
        ],
      ],
    });
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

  private validLanguageCodeValidator(): { invalidLanguageCode: true } | null {
    const value = this.form?.controls.language?.value as string | undefined;

    if (!value) {
      return null;
    }

    return isValidCode(value) ? null : { invalidLanguageCode: true };
  }

  private languageNotAlreadyExistingValidator(): {
    languageAlreadyExists: true;
  } | null {
    const value = this.form?.controls.language?.value as string | undefined;

    if (!value) {
      return null;
    }

    const existing = this.data.existing ?? [];

    return existing.includes(value) ? { languageAlreadyExists: true } : null;
  }
}
