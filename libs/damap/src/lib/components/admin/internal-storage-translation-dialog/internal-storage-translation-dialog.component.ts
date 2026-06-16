import { Component, inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormService } from '../../../services/form.service';
import { InternalStorageTranslation } from '../../../domain/internal-storage';
import {
  isValidCode,
  LanguageCodeOption,
} from '../../../domain/language-codes';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { LanguageCodeInputComponent } from '../../../shared/language-code-input/language-code-input.component';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'internal-storage-translation-dialog',
  templateUrl: './internal-storage-translation-dialog.component.html',
  styleUrl: './internal-storage-translation-dialog.component.css',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    LanguageCodeInputComponent,
    InputWrapperComponent,
    TextareaWrapperComponent,
    MatDialogActions,
    MatButton,
    TranslateModule,
  ],
})
export class InternalStorageTranslationDialogComponent {
  dialogRef =
    inject<MatDialogRef<InternalStorageTranslationDialogComponent>>(
      MatDialogRef,
    );
  private formService = inject(FormService);
  data = inject<{
    storageId: number;
    translation: InternalStorageTranslation;
    mode: string;
  }>(MAT_DIALOG_DATA);

  public mode = 'add';
  storageTranslation: UntypedFormGroup;

  constructor() {
    const data = this.data;

    this.storageTranslation =
      this.formService.createInternalStorageTranslationFormGroup();

    if (data.translation) {
      this.storageTranslation.patchValue({
        ...data.translation,
        languageCode: data.translation.languageCode,
      });
    }

    this.storageTranslation.get('storageId')?.setValue(data.storageId);

    this.languageCode.addValidators([
      Validators.required,
      this.validLanguageCodeValidator.bind(this),
    ]);

    this.languageCode.updateValueAndValidity();

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
      languageCode: this.storageTranslation.value.languageCode as string,
    };

    this.dialogRef.close(newTranslation);
  }

  private validLanguageCodeValidator(): { invalidLanguageCode: true } | null {
    const value = this.languageCode?.value as string | undefined;

    if (!value) {
      return null;
    }

    return isValidCode(value) ? null : { invalidLanguageCode: true };
  }
}
