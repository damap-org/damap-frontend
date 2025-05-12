import { Component, Input } from '@angular/core';

import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'damap-export-warning-dialog',
  templateUrl: './export-warning-dialog.html',
  styleUrls: ['./export-warning-dialog.css'],
  standalone: false,
})
export class ExportWarningDialogComponent {
  @Input() dmpForm: UntypedFormGroup;
  @Input() project: UntypedFormGroup;
  @Input() funderSupported: boolean;

  dmpTemplate: any = ETemplateType;

  selectedTemplate = '';

  constructor(public dialogRef: MatDialogRef<ExportWarningDialogComponent>) {}
}
