import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  InternalStorage,
  InternalStorageTranslation,
} from '../../domain/internal-storage';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { BackendService } from '../../services/backend.service';
import { FeedbackService } from '../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { InternalStorageDialogComponent } from '../../components/admin/internal-storage-dialog/internal-storage-dialog.component';
import { InternalStorageTranslationDialogComponent } from '../../components/admin/internal-storage-translation-dialog/internal-storage-translation-dialog.component';
import { DeleteWarningDialogComponent } from '../delete-warning-dialog/delete-warning-dialog.component';
import { DeleteStorageTranslationWarningDialogComponent } from './dialog/delete-storage-translation-warning-dialog.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'damap-internal-storage-translation-table',
  templateUrl: './internal-storage-translation-table.component.html',
  styleUrls: ['./internal-storage-translation-table.component.css'],
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatDivider,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator,
    TranslateModule,
  ],
})
export class InternalStorageTranslationTableComponent
  implements AfterViewInit, OnChanges
{
  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  @Input() internalStorageTranslations: InternalStorageTranslation[] = [];
  @Input() selectedInternalStorageId: number;

  dataSource = new MatTableDataSource<InternalStorageTranslation>();

  readonly tableHeaders: string[] = [
    'languageCode',
    'title',
    'description',
    'backupFrequency',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.internalStorageTranslations) {
      this.dataSource.data = this.internalStorageTranslations;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (
      data: InternalStorageTranslation,
      filter: string,
    ) => data.title?.toLowerCase().includes(filter.trim().toLowerCase());
  }

  deleteStorageTranslation(id: number) {
    this.dialog
      .open(DeleteStorageTranslationWarningDialogComponent)
      .afterClosed()
      .subscribe({
        next: response => {
          if (response) {
            const translation = this.internalStorageTranslations.find(
              t => t.id === id,
            );
            this.backendService
              .deleteInternalStorageTranslation(translation.storageId, id)
              .subscribe(
                () => {
                  this.internalStorageTranslations =
                    this.internalStorageTranslations.filter(t => t.id !== id);
                  this.dataSource.data = this.internalStorageTranslations;
                  this.feedbackService.success(
                    'http.success.storage.translations.delete',
                  );
                },
                error => {
                  // Check if HTTP code 400, if yes, last translation cannot be deleted
                  if (error.status === 400) {
                    this.feedbackService.error(
                      this.translateService.instant(
                        'http.error.storageErrors.lastTranslation',
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

  editStorageTranslation(id: number) {
    const translation = this.internalStorageTranslations.find(t => t.id === id);

    const dialogRef = this.dialog.open(
      InternalStorageTranslationDialogComponent,
      {
        width: '75%',
        maxWidth: '800px',
        data: {
          translation: { ...translation },
          mode: 'edit',
          storageId: this.selectedInternalStorageId,
        },
      },
    );

    dialogRef.afterClosed().subscribe(translation => {
      if (translation) {
        this.backendService
          .updateInternalStorageTranslation(translation)
          .subscribe(
            () => {
              this.internalStorageTranslations =
                this.internalStorageTranslations.map(t =>
                  t.id === translation.id ? translation : t,
                );
              this.dataSource.data = this.internalStorageTranslations;
              this.feedbackService.success(
                'http.success.storage.translations.edit',
              );
            },
            error => {
              // Make sure to show the correct error message (depending on the response of the backend as we do not have a unified error message format right now)
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
}
