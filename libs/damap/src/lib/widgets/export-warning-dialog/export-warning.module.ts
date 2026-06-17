import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { ExportWarningDialogComponent } from './export-warning-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslatePipe, TranslateDirective,
    FormsModule,
    // Materials
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    ExportWarningDialogComponent,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    ExportWarningDialogComponent,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class ExportWarningModule {}
