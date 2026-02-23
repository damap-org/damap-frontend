import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../services/backend.service';
import { MatSelectChange } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { ETemplateType } from '../../../domain/enum/export-template-type.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';

@Component({
  selector: 'damap-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrl: './live-preview.component.css',
  standalone: false,
})
export class LivePreviewComponent implements OnInit {
  @Input() selectedTemplate: number | null = null;

  dmpForm: FormGroup;
  pdfUrl: any = null;

  private configService = inject(ConfigService);

  readonly activeTemplates = computed(() =>
    this.configService.getActiveTemplates(),
  );

  constructor(
    public dialogRef: MatDialogRef<ExportWarningDialogComponent>,
    private backendService: BackendService,
    private formService: FormService,
    private sanitizer: DomSanitizer,
  ) {
    this.dmpForm = this.formService.dmpForm;
  }

  ngOnInit(): void {
    this.refreshPreview();
  }

  refreshPreview(): void {
    if (this.selectedTemplate) {
      this.onTemplateChange({
        value: this.selectedTemplate,
      } as MatSelectChange);
    }
  }

  onTemplateChange(template: MatSelectChange): void {
    this.pdfUrl = null;

    this.backendService
      .getPreviewPDF(this.dmpForm.value.id, template.value)
      .subscribe((response: any) => {
        const url = window.URL.createObjectURL(response);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }
}
