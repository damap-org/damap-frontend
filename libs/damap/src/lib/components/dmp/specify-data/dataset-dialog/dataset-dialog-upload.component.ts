import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dataset-dialog-upload',
  templateUrl: './dataset-dialog-upload.component.html',
  standalone: false,
})
export class DatasetDialogUploadComponent {
  constructor(
    public dialogRef: MatDialogRef<DatasetDialogUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose(dataset: any): void {
    this.dialogRef.close(dataset);
  }
}
