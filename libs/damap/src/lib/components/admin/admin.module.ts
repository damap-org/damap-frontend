import { AdminComponent } from './admin.component';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { CommonModule } from '@angular/common';
import { DeleteRepositoryWarningDialogComponent } from './edit-repositories-page/delete-repository-warning-dialog.component';
import { DmpTableModule } from '../../widgets/dmp-table/dmp-table.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditRepositoriesPageComponent } from './edit-repositories-page/edit-repositories-page.component';
import { ErrorMessageModule } from '../../widgets/error-message/error-message.module';
import { ExportWarningModule } from '../../widgets/export-warning-dialog/export-warning.module';
import { InternalStoragaTranslationTableModule } from '../../widgets/internal-storage-translation-table/internal-storage-translation-table.module';
import { InternalStorageDialogComponent } from './internal-storage-dialog/internal-storage-dialog.component';
import { InternalStorageTableModule } from '../../widgets/internal-storage-table/internal-storage-table.module';
import { InternalStorageTranslationDialogComponent } from './internal-storage-translation-dialog/internal-storage-translation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

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
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  declarations: [
    AdminComponent,
    InternalStorageDialogComponent,
    InternalStorageTranslationDialogComponent,
    BannerDialogComponent,
    DeleteRepositoryWarningDialogComponent,
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
