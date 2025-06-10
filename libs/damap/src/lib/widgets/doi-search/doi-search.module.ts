import { NgModule } from '@angular/core';
import { DoiSearchComponent } from './doi-search.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DoiSearchComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageModule,
    SharedModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DoiSearchComponent,
    ErrorMessageModule,
    SharedModule,

    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class DoiSearchModule {}
