import { Component, Input, OnInit } from '@angular/core';

import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';
import { Dmp } from '../../domain/dmp';
import { TemplateSelectorService } from '../../services/template-selector.service';

@Component({
  selector: 'damap-export-warning-dialog',
  templateUrl: './export-warning-dialog.html',
  styleUrls: ['./export-warning-dialog.css'],
})
export class ExportWarningDialogComponent implements OnInit {
  @Input() dmpForm: Dmp;
  @Input() project: UntypedFormGroup;
  @Input() funderSupported: boolean;

  dmpTemplate: any = ETemplateType;

  selectedTemplate = '';

  templateOptions = Object.values(ETemplateType);

  constructor(
    public dialogRef: MatDialogRef<ExportWarningDialogComponent>,
    private templateService: TemplateSelectorService,
  ) {}

  ngOnInit(): void {
    this.selectedTemplate =
      Object.keys(ETemplateType)[
        this.templateOptions.indexOf(
          this.templateService.selectTemplate(this.dmpForm),
        )
      ];
  }
}
