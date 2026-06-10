import { NgModule } from '@angular/core';
import { CrisTagComponent } from './cris-tag.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, CrisTagComponent],
  exports: [CommonModule, TranslateModule, CrisTagComponent],
})
export class CrisTagModule {}
