import { CommonModule } from '@angular/common';
import { DmpTableModule } from '../../widgets/dmp-table/dmp-table.module';
import { ErrorMessageModule } from '../../widgets/error-message/error-message.module';
import { ExportWarningModule } from '../../widgets/export-warning-dialog/export-warning.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdminComponent } from './admin.component';
import { InternalStorageTableModule } from '../../widgets/internal-storage-table/internal-storage-table.module';
import { InternalStorageDialogComponent } from './internal-storage-dialog/internal-storage-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InternalStoragaTranslationTableModule } from '../../widgets/internal-storage-translation-table/internal-storage-translation-table.module';
import { InternalStorageTranslationDialogComponent } from './internal-storage-translation-dialog/internal-storage-translation-dialog.component';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    ExportWarningModule,
    InternalStorageTableModule,
    InternalStoragaTranslationTableModule,
    ReactiveFormsModule,
    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    SharedModule,
    MatCheckboxModule,
  ],
  declarations: [
    AdminComponent,
    InternalStorageDialogComponent,
    InternalStorageTranslationDialogComponent,
    BannerDialogComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    AdminComponent,
    ExportWarningModule,
    InternalStorageTableModule,

    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
})
export class AdminModule {}
