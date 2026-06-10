import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // Materials
    MatIconModule,
    MatTooltipModule,
    TooltipComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    TooltipComponent,
    // Materials
    MatIconModule,
    MatTooltipModule,
  ],
})
export class TooltipModule {}
