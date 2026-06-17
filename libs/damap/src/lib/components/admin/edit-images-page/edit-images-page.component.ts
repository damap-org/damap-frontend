import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageThemeService } from '../../../../../../../apps/damap-frontend/src/app/services/image-theme.service';

import { FeedbackService } from '../../../services/feedback.service';
import { BackendService } from '../../../services/backend.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';
import {
  ImageKey,
  THEME_IMAGE_DEFINITIONS,
  ThemeImageDefinition,
  getAcceptAttribute,
  getAllowedMimeTypes,
  formatAllowedTypesForDisplay,
} from '../../../domain/image-keys';
import { DeleteImageWarningDialogComponent } from './delete-image-warning-dialog.component';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

@Component({
  selector: 'app-admin-images',
  templateUrl: './edit-images-page.component.html',
  styleUrls: ['./edit-images-page.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCheckboxModule,
    TranslatePipe, TranslateDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditImagesPageComponent {
  private readonly imageThemeService = inject(ImageThemeService);
  private readonly configService = inject(ConfigService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly backendService = inject(BackendService);
  private readonly dialog = inject(MatDialog);

  readonly themeImages = computed<ThemeImageDefinition[]>(() => {
    const config = this.configService.getConfig();
    const backendImages = config?.images || [];

    return THEME_IMAGE_DEFINITIONS.filter(
      imageDef => !(imageDef.multitenancyLocked && config.multitenancyEnabled),
    ).map(imageDef => {
      const backendImg = backendImages.find(
        beImg => beImg.imageKey === imageDef.key,
      );
      if (backendImg) {
        return {
          ...imageDef,
          defaultUrl: `data:${backendImg.mimeType};base64,${backendImg.data}`,
          isCustom: true,
        };
      }
      return { ...imageDef, isCustom: false };
    });
  });

  readonly selectedFile = signal<File | null>(null);
  readonly selectedImageKey = signal(this.themeImages()[0].key);
  readonly isDragOver = signal(false);
  readonly acceptAttribute = getAcceptAttribute();

  private isValidFile(file: File, imageKey: string): boolean {
    if (!file || !imageKey) {
      this.feedbackService.error('admin.images.upload.select-file-and-type');
      return false;
    }

    if (!getAllowedMimeTypes().includes(file.type)) {
      this.feedbackService.error(
        this.translate.instant('admin.images.upload.invalid-file-type', {
          allowedTypes: formatAllowedTypesForDisplay(),
        }),
      );
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      this.feedbackService.error(
        this.translate.instant('admin.images.upload.file.size-too-large', {
          maxSize: this.formatFileSize(MAX_FILE_SIZE),
        }),
      );
      return false;
    }

    return true;
  }

  uploadImage() {
    if (!this.isValidFile(this.selectedFile(), this.selectedImageKey())) {
      return;
    }

    const payload: FormData = new FormData();
    payload.append('imageKey', this.selectedImageKey());
    payload.append('file', this.selectedFile()!);

    this.backendService
      .uploadImageTheme(this.selectedImageKey(), payload)
      .subscribe({
        next: () => {
          this.feedbackService.success('admin.images.upload.success');
          this.selectedImageKey.set(this.themeImages()[0].key);
          window.location.reload();
        },
        error: error => {
          this.feedbackService.error('admin.images.upload.error');
        },
        complete: () => {
          this.selectedFile.set(null);
        },
      });
  }

  deleteImage(imageId: string) {
    const dialogRef = this.dialog.open(DeleteImageWarningDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.backendService.deleteImageTheme(imageId).subscribe({
          next: () => {
            this.feedbackService.success('admin.images.delete.success');
            window.location.reload();
          },
          error: error => {
            this.feedbackService.error('admin.images.delete.error');
          },
        });
      }
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getImageRecommendation(imageKey: ImageKey): string {
    const imageType = THEME_IMAGE_DEFINITIONS.find(t => t.key === imageKey);
    return imageType ? imageType.recommendation : '';
  }

  selectImageKey(imageKey: ImageKey) {
    this.selectedImageKey.set(imageKey);
  }

  clearSelectedFile() {
    this.selectedFile.set(null);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.isValidFile(file, this.selectedImageKey())) {
      this.selectedFile.set(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (
      files &&
      files.length > 0 &&
      this.isValidFile(files[0], this.selectedImageKey())
    ) {
      this.selectedFile.set(files[0]);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/admin']);
  }
}
