import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { RecommendedRepository } from '../../../domain/recommended-repository';
import { DeleteWarningDialogComponent } from '../../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-delete-repository-warning-dialog',
    templateUrl: './delete-repository-warning-dialog.component.html',
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        TranslateModule,
    ],
})
export class DeleteRepositoryWarningDialogComponent extends DeleteWarningDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRepositoryWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { repository: RecommendedRepository },
  ) {
    super();
  }

  override getDeleteContent(): string {
    return 'admin.recommended-repositories.delete-dialog.message';
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
