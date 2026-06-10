import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { BackendService } from '../../../services/backend.service';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { ETemplateType } from '../../../domain/enum/export-template-type.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipeMock } from '../../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'damap-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrl: './live-preview.component.css',
  imports: [
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatIcon,
    CdkScrollable,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    TranslateModule,
    TranslatePipeMock,
  ],
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
