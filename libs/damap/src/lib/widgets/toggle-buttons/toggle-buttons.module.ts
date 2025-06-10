import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { ToggleButtonsComponent } from './toggle-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    LayoutModule,
  ],
  declarations: [ToggleButtonsComponent],
  exports: [CommonModule, ToggleButtonsComponent, TranslateModule],
})
export class ToggleButtonsModule {}
