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
import { PlansComponent } from './plans.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    ExportWarningModule,
    // Materials
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    InfoCardComponent,
  ],
  declarations: [PlansComponent],
  exports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    DmpTableModule,
    ErrorMessageModule,
    PlansComponent,
    ExportWarningModule,

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
export class PlansModule {}
