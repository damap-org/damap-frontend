import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InternalStorage } from '../../../domain/internal-storage';
import {
  isValidCode,
  LANGUAGE_CODE_OPTIONS,
} from '../../../domain/language-codes';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'damap-internal-storage-dialog',
  templateUrl: './internal-storage-dialog.component.html',
  styleUrl: './internal-storage-dialog.component.css',
  standalone: false,
})
export class InternalStorageDialogComponent {
  public mode = 'add';
  storage: UntypedFormGroup;
  storageTranslation: UntypedFormGroup;

  readonly languageOptions = LANGUAGE_CODE_OPTIONS;

  constructor(
    public dialogRef: MatDialogRef<InternalStorageDialogComponent>,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA)
    public data: { storage: InternalStorage; mode: string },
  ) {
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
