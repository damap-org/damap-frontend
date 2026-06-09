import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-storage-info-dialog',
    templateUrl: './storage-info-dialog.component.html',
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        TranslateModule,
    ],
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
