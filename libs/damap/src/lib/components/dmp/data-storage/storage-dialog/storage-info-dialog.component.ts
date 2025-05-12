import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-storage-info-dialog',
  templateUrl: './storage-info-dialog.component.html',
  standalone: false,
})
export class StorageInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StorageInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
      link: string;
      name: string;
    },
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
