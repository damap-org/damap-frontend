import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteWarningDialogComponent } from '../../delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'damap-delete-storage-translation-warning-dialog',
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{ 'delete.dialog.title' | translate }}</h1>
    <mat-dialog-content>{{
      getDeleteContent() | translate
    }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">
        {{ 'delete.dialog.button.cancel' | translate }}
      </button>
      <button mat-button [mat-dialog-close]="true">
        {{ 'delete.dialog.button.delete' | translate }}
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
})
export class DeleteStorageTranslationWarningDialogComponent extends DeleteWarningDialogComponent {
  override getDeleteContent(): string {
    return 'delete.dialog.message.storageTranslation';
  }
}
