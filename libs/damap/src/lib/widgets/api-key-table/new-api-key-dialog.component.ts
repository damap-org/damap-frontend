import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-api-key-dialog',
  template: `
    <h1 mat-dialog-title>API Key Created</h1>
    <div mat-dialog-content>
      <p>Your new API key has been created successfully.</p>
      <p>Please copy and save it securely, as it will not be shown again.</p>
      <p>Your new API key is:</p>
      <pre>{{ data.apiKey }}</pre>
      <button
        mat-button
        (click)="copyToClipboard()"
        mat-raised-button
        class="button-color-primary">
        Copy to Clipboard
      </button>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class ApiKeyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { apiKey: string }) {}

  // Copy the API key function to the clipboard

  copyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.data.apiKey;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
