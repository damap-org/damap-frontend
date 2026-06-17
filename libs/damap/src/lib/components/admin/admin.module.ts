import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddLanguageDialogComponent } from './translation-management/dialogs/add-language-dialog.component';
import { AdminComponent } from './admin.component';
import { BannerDialogComponent } from './banner-dialog/banner-dialog.component';
import { CommonModule } from '@angular/common';
import { DeleteRepositoryWarningDialogComponent } from './edit-repositories-page/delete-repository-warning-dialog.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ExportWarningModule } from '../../widgets/export-warning-dialog/export-warning.module';

import { InternalStorageDialogComponent } from './internal-storage-dialog/internal-storage-dialog.component';

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
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { TranslationManagementComponent } from './translation-management/translation-management.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { LanguageCodeInputComponent } from '../../shared/language-code-input/language-code-input.component';

@NgModule({
  imports: [
    CommonModule,
    TranslatePipe, TranslateDirective,
    RouterModule,
    ExportWarningModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatTooltipModule,
    MatSlideToggle,
    LanguageCodeInputComponent,
    AdminComponent,
    InternalStorageDialogComponent,
    InternalStorageTranslationDialogComponent,
    BannerDialogComponent,
    DeleteRepositoryWarningDialogComponent,
    TranslationManagementComponent,
    AddLanguageDialogComponent,
  ],
  exports: [
    CommonModule,
    TranslatePipe, TranslateDirective,
    RouterModule,
    AdminComponent,
    ExportWarningModule,
    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    TranslationManagementComponent,
  ],
})
export class AdminModule {}
