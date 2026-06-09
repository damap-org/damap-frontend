import { Component, computed, inject, Input } from '@angular/core';

import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';
import { ConfigService } from '../../../../../../apps/damap-frontend/src/app/services/config.service';
import { CdkScrollable } from '@angular/cdk/scrolling';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'damap-export-warning-dialog',
    templateUrl: './export-warning-dialog.html',
    styleUrls: ['./export-warning-dialog.css'],
    imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogClose,
    TranslateModule
],
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
