import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteWarningDialogComponent } from '../../delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'damap-delete-storage-translation-warning-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{ 'dialog.delete.title' | translate }}</h1>
    <mat-dialog-content>{{
      getDeleteContent() | translate
    }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">
        {{ 'dialog.delete.cancel' | translate }}
      </button>
      <button mat-button [mat-dialog-close]="true">
        {{ 'dialog.delete.button' | translate }}
      </button>
    </mat-dialog-actions>
  `,
})
export class DeleteStorageTranslationWarningDialogComponent extends DeleteWarningDialogComponent {
  override getDeleteContent(): string {
    return 'dialog.delete.content.storageTranslation';
  }
}
