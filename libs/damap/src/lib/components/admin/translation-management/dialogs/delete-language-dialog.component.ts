import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'damap-delete-language-dialog',
  templateUrl: './delete-language-dialog.component.html',
  styleUrl: './delete-language-dialog.component.css',
  standalone: false,
})
export class DeleteLanguageDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteLanguageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { language: string },
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
