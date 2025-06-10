import { CommonModule } from '@angular/common';
import { InternalStorageTranslationTableComponent } from './internal-storage-translation-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  declarations: [InternalStorageTranslationTableComponent],
  exports: [
    CommonModule,
    RouterModule,
    InternalStorageTranslationTableComponent,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatMenuModule,
    MatTooltipModule,
  ],
})
export class InternalStoragaTranslationTableModule {}
