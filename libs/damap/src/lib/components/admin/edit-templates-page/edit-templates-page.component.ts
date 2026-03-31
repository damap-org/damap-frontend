import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FeedbackService } from '../../../services/feedback.service';
import { BackendService } from '../../../services/backend.service';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';

@Component({
  selector: 'app-admin-templates',
  templateUrl: './edit-templates-page.component.html',
  styleUrls: ['./edit-templates-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTemplatesPageComponent {
  private readonly feedbackService = inject(FeedbackService);
  private readonly backendService = inject(BackendService);
  private readonly configService = inject(ConfigService);
  private readonly router = inject(Router);

  readonly selectedFile = signal<File | null>(null);
  readonly templateName = signal<string>('');
  readonly isDragOver = signal(false);
  readonly isProcessing = signal<boolean>(false);

  readonly localTemplates = signal<any[]>([]);

  readonly activeCount = computed(
    () => this.localTemplates().filter(t => t.active).length,
  );

  uploadTemplate() {
    const file = this.selectedFile();
    if (!file || !this.templateName()) {
      this.feedbackService.error('admin.templates.error.missing');
      return;
    }
    if (!this.isValidWordFile(file)) {
      this.feedbackService.error('admin.templates.error.format');
      return;
    }

    const payload = new FormData();
    payload.append('file', file);
    payload.append('name', this.templateName());

    this.backendService.uploadExportTemplate(payload).subscribe({
      next: () => {
        this.configService.refreshConfig().then(newConfig => {
          this.localTemplates.set([...(newConfig?.templates || [])]);
          this.feedbackService.success('admin.templates.success.upload');
          this.clearFile();
          this.templateName.set('');
        });
      },
      error: () => this.feedbackService.error('admin.templates.error.upload'),
    });
  }

  constructor() {
    const initialTemplates = this.configService.getConfig()?.templates || [];
    this.localTemplates.set([...initialTemplates].sort((a, b) => a.id - b.id));
  }

  toggleStatus(template: any) {
    if (this.isProcessing()) return;
    this.isProcessing.set(true);

    const previousState = template.active;
    const newState = !previousState;

    this.updateLocalActiveStatus(template.id, newState);

    this.backendService.toggleExportTemplateActive(template.id).subscribe({
      next: () => {
        this.configService
          .refreshConfig()
          .then(newConfig => {
            const sorted = [...(newConfig?.templates || [])].sort(
              (a, b) => a.id - b.id,
            );
            this.localTemplates.set(sorted);
            this.feedbackService.success('admin.templates.success.status');
            this.isProcessing.set(false);
          })
          .catch(() => {
            this.updateLocalActiveStatus(template.id, previousState);
            this.isProcessing.set(false);
          });
      },
      error: () => {
        this.updateLocalActiveStatus(template.id, previousState);
        this.feedbackService.error('admin.templates.error.status');
        this.isProcessing.set(false);
      },
    });
  }

  private updateLocalActiveStatus(id: number, active: boolean) {
    this.localTemplates.update(templates =>
      templates.map(t => (t.id === id ? { ...t, active } : t)),
    );
  }

  private isValidWordFile(file: File): boolean {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      this.feedbackService.error('admin.templates.error.size');
      return false;
    }
    const allowedExtensions = ['.docx'];
    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    const name = file.name.toLowerCase();
    const isExtensionValid = allowedExtensions.some(ext => name.endsWith(ext));
    const isMimeValid = allowedMimeTypes.includes(file.type);

    return isExtensionValid || isMimeValid;
  }

  deleteTemplate(id: number) {
    if (this.isProcessing()) return;
    this.isProcessing.set(true);

    this.backendService.deleteExportTemplate(id).subscribe({
      next: () => {
        this.configService
          .refreshConfig()
          .then(newConfig => {
            const sorted = [...(newConfig?.templates || [])].sort(
              (a, b) => a.id - b.id,
            );
            this.localTemplates.set(sorted);
            this.feedbackService.success('admin.templates.success.delete');
            this.isProcessing.set(false);
          })
          .catch(() => {
            this.feedbackService.error('landing-page.servers-down');
            this.isProcessing.set(false);
          });
      },
      error: () => {
        this.feedbackService.error('admin.templates.error.delete');
        this.isProcessing.set(false);
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.isValidWordFile(file)) {
      this.selectedFile.set(file);
    } else {
      event.target.value = '';
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    if (event.dataTransfer?.files?.length) {
      this.selectedFile.set(event.dataTransfer.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }
  onDragLeave() {
    this.isDragOver.set(false);
  }
  clearFile() {
    this.selectedFile.set(null);
  }
  navigateBack() {
    this.router.navigate(['/admin']);
  }
}
