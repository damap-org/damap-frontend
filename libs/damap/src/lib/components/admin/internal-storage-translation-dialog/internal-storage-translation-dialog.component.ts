import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../../services/form.service';
import { InternalStorageTranslation } from '../../../domain/internal-storage';

@Component({
  selector: 'internal-storage-translation-dialog',
  templateUrl: './internal-storage-translation-dialog.component.html',
  styleUrl: './internal-storage-translation-dialog.component.css',
})
export class InternalStorageTranslationDialogComponent {
  public mode = 'add';
  storageTranslation: UntypedFormGroup;

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
      this.storageTranslation.patchValue(data.translation);
    }

    this.storageTranslation.get('storageId').setValue(data.storageId);

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

  onDialogClose() {
    let newTranslation = this.storageTranslation.value;
    newTranslation.id = this.data.translation?.id;
    this.dialogRef.close(newTranslation);
  }
}
