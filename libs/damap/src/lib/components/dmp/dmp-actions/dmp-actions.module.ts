import {
  DmpActionsComponent,
  SaveVersionDialogComponent,
} from './dmp-actions.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LivePreviewModule } from '../live-preview/live-preview.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaveStatusModule } from '../../../widgets/save-status/save-status.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DmpActionsComponent, SaveVersionDialogComponent],
  exports: [
    DmpActionsComponent,
    // Materials
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SaveStatusModule,
    SharedModule,
    LivePreviewModule,

    // Materials
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
})
export class DmpActionsModule {}
