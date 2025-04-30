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
import { AccountComponent } from './account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiKeyTableModule } from '../../widgets/api-key-table/api-key-table.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    ExportWarningModule,
    ReactiveFormsModule,
    ApiKeyTableModule,
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
  declarations: [AccountComponent],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    AccountComponent,
    ExportWarningModule,
    ApiKeyTableModule,

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
export class AccountModule {}
