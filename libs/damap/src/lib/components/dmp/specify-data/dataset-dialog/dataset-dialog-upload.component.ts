import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FileUploadComponent } from '../../../../widgets/file-upload/file-upload.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-dataset-dialog-upload',
    templateUrl: './dataset-dialog-upload.component.html',
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FileUploadComponent,
        MatDialogActions,
        MatButton,
        TranslateModule,
    ],
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
