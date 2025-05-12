import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from '../../auth/auth.service';
import {
  InternalStorage,
  InternalStorageTranslation,
} from '../../domain/internal-storage';
import { MatDialog } from '@angular/material/dialog';
import { InternalStorageDialogComponent } from './internal-storage-dialog/internal-storage-dialog.component';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { InternalStorageTranslationDialogComponent } from './internal-storage-translation-dialog/internal-storage-translation-dialog.component';
import { firstValueFrom } from 'rxjs';
import { Banner } from '../../domain/banner';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { DeleteStorageWarningDialogComponent } from '../../widgets/internal-storage-table/dialog/delete-storage-warning-dialog.component';
import { DeleteBannerWarningDialogComponent } from './banner-dialog/delete-banner-warning-dialog.component';
import validator from 'validator';

@Component({
  selector: 'damap-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: false,
})
export class AdminComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private dialog: MatDialog,
    private feedbackService: FeedbackService,
  ) {}

  showOnlyActive = true;
  internalStorages: InternalStorage[] = [];
  internalStorageTranslations: InternalStorageTranslation[] = [];
  selectedInternalStorageId: number;
  selectedInternalStorageUrl: string;

  appBanner: Banner | null = null;

  ngOnInit(): void {
    this.selectedInternalStorageId = null;
    this.selectedInternalStorageUrl = null;

    this.backendService.searchInternalStorage({}).subscribe(data => {
      this.internalStorages = data.items;
    });

    this.backendService.getAppBanner().subscribe(banner => {
      this.appBanner = banner;
    });
  }

  async openStorageDialog() {
    const dialogRef = this.dialog.open(InternalStorageDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { mode: 'add' },
    });

    const storage = await firstValueFrom(dialogRef.afterClosed());
    if (storage) {
      if (!this.isValidUrl(storage.url)) {
        this.feedbackService.error('http.error.storageErrors.invalidUrl');
        return;
      }
      this.backendService.createInternalStorage(storage).subscribe(
        () => {
          this.feedbackService.success('http.success.storage.add');
          this.backendService.searchInternalStorage({}).subscribe(data => {
            this.internalStorages = data.items;
            this.selectStorage(data.items.find(s => s.url === storage.url).id);
          });
        },
        error => {
          if (error.error?.message) {
            this.feedbackService.error(error.error.message);
          } else {
            this.feedbackService.error(error.message);
          }
        },
      );
    }
  }

  openBannerDialog(type: 'edit' | 'add') {
    const dialogRef = this.dialog.open(BannerDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { mode: type, banner: this.appBanner },
    });

    dialogRef.afterClosed().subscribe(banner => {
      if (banner) {
        if (type === 'edit') {
          this.backendService.updateAppBanner(banner).subscribe(
            () => {
              this.appBanner = banner;
              this.feedbackService.success('http.success.banner.edit');
              this.refreshPage();
            },
            error => {
              if (error.error?.message) {
                this.feedbackService.error(error.error.message);
              } else {
                this.feedbackService.error(error.message);
              }
            },
          );
        } else {
          this.backendService.createAppBanner(banner).subscribe(
            () => {
              this.appBanner = banner;
              this.feedbackService.success('http.success.banner.add');
              this.refreshPage();
            },
            error => {
              if (error.error?.message) {
                this.feedbackService.error(error.error.message);
              } else {
                this.feedbackService.error(error.message);
              }
            },
          );
        }
      }
    });
  }

  deleteBanner() {
    this.dialog
      .open(DeleteBannerWarningDialogComponent)
      .afterClosed()
      .subscribe({
        next: response => {
          if (!response) {
            return;
          }
          this.backendService.deleteAppBanner().subscribe(
            () => {
              this.appBanner = null;
              this.feedbackService.success('http.success.banner.delete');
              this.refreshPage();
            },
            error => {
              if (error.error?.message) {
                this.feedbackService.error(error.error.message);
              } else {
                this.feedbackService.error(error.message);
              }
            },
          );
        },
      });
  }

  isValidUrl(url: string): boolean {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: false,
      require_valid_protocol: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false,
    });
  }

  openTranslationDialog() {
    const dialogRef = this.dialog.open(
      InternalStorageTranslationDialogComponent,
      {
        width: '75%',
        maxWidth: '800px',
        data: { mode: 'add', storageId: this.selectedInternalStorageId },
      },
    );

    dialogRef.afterClosed().subscribe(translation => {
      if (translation) {
        this.backendService
          .createInternalStorageTranslation(translation)
          .subscribe(
            () => {
              this.backendService
                .getAllInternalStorageTranslationsForStorage(
                  this.selectedInternalStorageId,
                )
                .subscribe(data => {
                  this.internalStorageTranslations = data;
                  this.feedbackService.success(
                    'http.success.storage.translations.add',
                  );
                });
            },
            error => {
              if (error.error?.message) {
                this.feedbackService.error(error.error.message);
              } else {
                this.feedbackService.error(error.message);
              }
            },
          );
      }
    });
  }

  selectStorage(storageId: number) {
    if (storageId === null) {
      this.resetStorageSelection();
      return;
    }
    this.backendService.getInternalStorage(storageId).subscribe(storage => {
      this.internalStorages = this.internalStorages.map(s =>
        s.id === storageId ? storage : s,
      );
      this.backendService
        .getAllInternalStorageTranslationsForStorage(storageId)
        .subscribe(data => {
          this.selectedInternalStorageId = storageId;
          this.internalStorageTranslations = data;
          this.selectedInternalStorageUrl = storage.url;
        });
    });
  }

  resetStorageSelection() {
    this.selectedInternalStorageId = null;
    this.internalStorageTranslations = [];
    this.selectedInternalStorageUrl = null;

    this.backendService.searchInternalStorage({}).subscribe(data => {
      this.internalStorages = data.items;
    });
  }

  refreshPage() {
    window.location.reload();
  }
}
