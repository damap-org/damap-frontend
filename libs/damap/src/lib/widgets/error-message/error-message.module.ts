import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // Materials
    MatIconModule,
    ErrorMessageComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ErrorMessageComponent,
    // Materials
    MatIconModule,
  ],
})
export class ErrorMessageModule {}
