import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDeletionComponent } from './data-deletion.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    // Materials
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    DataDeletionComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    DataDeletionComponent,
    // Materials
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
})
export class DataDeletionModule {}
