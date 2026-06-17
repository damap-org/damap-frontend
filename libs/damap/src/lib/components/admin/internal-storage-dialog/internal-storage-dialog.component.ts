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
import { InternalStorage } from '../../../domain/internal-storage';
import {
  isValidCode,
  LANGUAGE_CODE_OPTIONS,
} from '../../../domain/language-codes';
import { FormService } from '../../../services/form.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { InputWrapperComponent } from '../../../shared/input-wrapper/input-wrapper.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { LanguageCodeInputComponent } from '../../../shared/language-code-input/language-code-input.component';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'damap-internal-storage-dialog',
  templateUrl: './internal-storage-dialog.component.html',
  styleUrl: './internal-storage-dialog.component.css',
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    MatCheckbox,
    LanguageCodeInputComponent,
    TextareaWrapperComponent,
    MatDialogActions,
    MatButton,
    TranslatePipe,
  ],
})
export class InternalStorageDialogComponent {
  dialogRef =
    inject<MatDialogRef<InternalStorageDialogComponent>>(MatDialogRef);
  private formService = inject(FormService);
  data = inject<{
    storage: InternalStorage;
    mode: string;
  }>(MAT_DIALOG_DATA);

  public mode = 'add';
  storage: UntypedFormGroup;
  storageTranslation: UntypedFormGroup;

  readonly languageOptions = LANGUAGE_CODE_OPTIONS;

  constructor() {
    const data = this.data;

    this.storage = this.formService.createInternalStorageFormGroup();

    if (data.storage) {
      this.storage.patchValue(data.storage);
    }

    this.storageTranslation =
      this.formService.createInternalStorageTranslationFormGroup();

    this.languageCode.addValidators([
      Validators.required,
      this.validLanguageCodeValidator.bind(this),
    ]);

    this.mode = data.mode ?? this.mode;
  }

  get url(): UntypedFormControl {
    return this.storage.get('url') as UntypedFormControl;
  }

  get backupLocation(): UntypedFormControl {
    return this.storage.get('backupLocation') as UntypedFormControl;
  }

  get storageLocation(): UntypedFormControl {
    return this.storage.get('storageLocation') as UntypedFormControl;
  }

  get active(): UntypedFormControl {
    return this.storage.get('active') as UntypedFormControl;
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
    if (this.isDisabled()) {
      this.storage.markAllAsTouched();
      this.storageTranslation.markAllAsTouched();
      return;
    }

    const newStorage = this.storage.value;

    if (this.mode === 'add') {
      const languageCode = this.storageTranslation.value.languageCode as string;

      newStorage.translations = [
        {
          ...this.storageTranslation.value,
          languageCode: languageCode,
        },
      ];
    }

    this.dialogRef.close(newStorage);
  }

  isDisabled(): boolean {
    return (
      (this.mode === 'add' &&
        (this.storage.invalid || this.storageTranslation.invalid)) ||
      (this.mode === 'edit' && this.storage.invalid)
    );
  }

  private validLanguageCodeValidator(): { invalidLanguageCode: true } | null {
    const value = this.languageCode?.value as string | undefined;

    if (!value) {
      return null;
    }

    return isValidCode(value) ? null : { invalidLanguageCode: true };
  }
}
