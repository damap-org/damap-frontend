import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoMessageComponent } from './info-message.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule, InfoMessageComponent],
  exports: [CommonModule, MatIconModule, InfoMessageComponent],
})
export class InfoMessageModule {}
