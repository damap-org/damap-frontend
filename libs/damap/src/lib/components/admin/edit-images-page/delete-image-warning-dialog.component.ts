import { Component } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { DeleteWarningDialogComponent } from '../../../widgets/delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'damap-delete-image-warning-dialog',
  imports: [TranslatePipe, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>{{ 'delete.dialog.title' | translate }}</h1>
    <mat-dialog-content>{{
      getDeleteContent() | translate
    }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">
        {{ 'admin.images.dialog.cancel' | translate }}
      </button>
      <button mat-button [mat-dialog-close]="true">
        {{ 'admin.images.dialog.delete' | translate }}
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
})
export class DeleteImageWarningDialogComponent extends DeleteWarningDialogComponent {
  override getDeleteContent(): string {
    return 'admin.images.dialog.warning';
  }
}
