import { Component, computed, inject, Input } from '@angular/core';

import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';
import { ConfigService } from '../../../../../../apps/damap-frontend/src/app/services/config.service';

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

  private configService = inject(ConfigService);

  readonly activeTemplates = computed(() =>
    this.configService.getActiveTemplates(),
  );

  selectedTemplate: number | null = null;

  constructor(public dialogRef: MatDialogRef<ExportWarningDialogComponent>) {}
}
