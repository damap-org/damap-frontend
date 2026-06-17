import { CommonModule } from '@angular/common';

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
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { InfoCardComponent } from '../../widgets/info-card/info-card.component';

@NgModule({
  imports: [
    CommonModule,
    TranslatePipe, TranslateDirective,
    RouterModule,
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
    PlansComponent,
  ],
  exports: [
    CommonModule,
    TranslatePipe, TranslateDirective,
    RouterModule,
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
