import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveStatusComponent } from './save-status.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, MatIconModule, SaveStatusComponent],
  exports: [SaveStatusComponent, TranslateModule, MatIconModule],
})
export class SaveStatusModule {}
