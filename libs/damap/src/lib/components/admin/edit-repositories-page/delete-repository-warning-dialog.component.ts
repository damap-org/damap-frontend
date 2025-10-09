import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecommendedRepository } from '../../../domain/recommended-repository';
import { DeleteWarningDialogComponent } from '../../../widgets/delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'app-delete-repository-warning-dialog',
  templateUrl: './delete-repository-warning-dialog.component.html',
  standalone: false,
})
export class DeleteRepositoryWarningDialogComponent extends DeleteWarningDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRepositoryWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { repository: RecommendedRepository },
  ) {
    super();
  }

  override getDeleteContent(): string {
    return 'admin.repositories.delete-dialog.message';
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
