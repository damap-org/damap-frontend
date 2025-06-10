import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalStorage } from '../../domain/internal-storage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BackendService } from '../../services/backend.service';
import { FeedbackService } from '../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { InternalStorageDialogComponent } from '../../components/admin/internal-storage-dialog/internal-storage-dialog.component';
import { DeleteStorageWarningDialogComponent } from './dialog/delete-storage-warning-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import validator from 'validator';

@Component({
  selector: 'damap-internal-storage-table',
  templateUrl: './internal-storage-table.component.html',
  styleUrls: ['./internal-storage-table.component.css'],
})
export class InternalStorageTableComponent implements AfterViewInit, OnChanges {
  @Output() selectInternalStorage = new EventEmitter<number>();

  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  @Input() internalStorages: InternalStorage[] = [];
  dataSource = new MatTableDataSource<InternalStorage>();

  readonly tableHeaders: string[] = [
    'url',
    'storageLocation',
    'backupLocation',
    'active',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.internalStorages) {
      this.dataSource.data = this.internalStorages;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: InternalStorage, filter: string) =>
      data.url?.toLowerCase().includes(filter.trim().toLowerCase());
  }

  toggleActivation(id: number) {
    const storage = this.internalStorages.find(s => s.id === id);
    const storageCopy = { ...storage };
    storageCopy.active = !storage.active;
    this.backendService.updateInternalStorage(storageCopy).subscribe(() => {
      this.internalStorages = this.internalStorages.map(s =>
        s.id === id ? storageCopy : s,
      );
      this.dataSource.data = this.internalStorages;
    });
  }

  deleteStorage(id: number) {
    this.dialog
      .open(DeleteStorageWarningDialogComponent, {
        data: { deleteType: 'storage' },
      })
      .afterClosed()
      .subscribe({
        next: response => {
          if (response) {
            this.backendService.deleteInternalStorage(id).subscribe(
              () => {
                this.internalStorages = this.internalStorages.filter(
                  s => s.id !== id,
                );
                this.dataSource.data = this.internalStorages;
                this.feedbackService.success('http.success.storage.delete');
                this.editTranslations(null);
              },
              error => {
                if (error.status === 409) {
                  this.feedbackService.error(
                    this.translateService.instant(
                      'http.error.storageErrors.stillInUse',
                    ),
                  );
                  return;
                } else {
                  this.feedbackService.error(error.message);
                }
              },
            );
          }
        },
      });
  }

  editStorage(id: number) {
    const storage = this.internalStorages.find(s => s.id === id);

    const dialogRef = this.dialog.open(InternalStorageDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { storage: { ...storage }, mode: 'edit' },
    });

    dialogRef.afterClosed().subscribe(storage => {
      if (storage) {
        if (!this.isValidUrl(storage.url)) {
          this.feedbackService.error('http.error.storageErrors.invalidUrl');
          return;
        }
        this.backendService.updateInternalStorage(storage).subscribe(
          () => {
            this.internalStorages = this.internalStorages.map(s =>
              s.id === storage.id ? storage : s,
            );
            this.dataSource.data = this.internalStorages;
            this.selectInternalStorage.emit(storage.id);
            this.feedbackService.success('http.success.storage.edit');
          },
          error => {
            this.feedbackService.error(error.message);
          },
        );
      }
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

  editTranslations(storageId: number) {
    this.selectInternalStorage.emit(storageId);
  }
}
