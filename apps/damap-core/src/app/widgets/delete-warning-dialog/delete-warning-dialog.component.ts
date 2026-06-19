import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'damap-delete-warning-dialog',
  imports: [TranslatePipe, MatDialogModule, MatButtonModule],
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
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DeleteWarningDialogComponent {
  getDeleteContent(): string {
    return 'delete.dialog.message.dmp';
  }
}
