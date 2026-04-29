import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteWarningDialogComponent } from '../../../../widgets/delete-warning-dialog/delete-warning-dialog.component';

@Component({
  selector: 'damap-delete-language-dialog',
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>
      {{ 'admin.appTranslations.removeLanguage' | translate }}
    </h1>
    <mat-dialog-content>
      <p>
        {{
          getDeleteContent()
            | translate: { language: (data.language | uppercase) }
        }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">
        {{ 'admin.appTranslations.cancel' | translate }}
      </button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        {{ 'admin.appTranslations.removeLanguage' | translate }}
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
})
export class DeleteLanguageDialogComponent extends DeleteWarningDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { language: string }) {
    super();
  }

  override getDeleteContent(): string {
    return 'admin.appTranslations.removeLanguageWarningIrreversible';
  }
}
