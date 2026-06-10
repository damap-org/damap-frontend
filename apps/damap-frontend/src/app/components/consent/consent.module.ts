import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentComponent } from './consent.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // Materials
    MatDialogModule,
    MatButtonModule,
    ConsentComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ConsentComponent,
    // Materials
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ConsentModule {}
