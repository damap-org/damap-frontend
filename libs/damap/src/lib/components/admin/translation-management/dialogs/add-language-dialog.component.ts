import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'damap-add-language-dialog',
  templateUrl: './add-language-dialog.component.html',
  styleUrl: './add-language-dialog.component.css',
  standalone: false,
})
export class AddLanguageDialogComponent {
  readonly form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddLanguageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { existing: string[] },
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      language: ['', [Validators.required, Validators.pattern(/^[a-z]{2}$/i)]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = (this.form.value.language as string).trim().toLowerCase();
    this.dialogRef.close(value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
