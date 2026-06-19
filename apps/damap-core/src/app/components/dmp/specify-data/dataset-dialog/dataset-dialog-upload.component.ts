import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FileUploadComponent } from '../../../../widgets/file-upload/file-upload.component';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dataset-dialog-upload',
  templateUrl: './dataset-dialog-upload.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FileUploadComponent,
    MatDialogActions,
    MatButton,
    TranslatePipe,
  ],
})
export class DatasetDialogUploadComponent {
  dialogRef = inject<MatDialogRef<DatasetDialogUploadComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose(dataset: any): void {
    this.dialogRef.close(dataset);
  }
}
