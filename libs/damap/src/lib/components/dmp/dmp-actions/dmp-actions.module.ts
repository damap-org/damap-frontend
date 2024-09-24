import {
  DmpActionsComponent,
  SaveVersionDialogComponent,
} from './dmp-actions.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SaveStatusModule } from '../../../widgets/save-status/save-status.module';
import { TranslateModule } from '@ngx-translate/core';
import { LivePreviewModule } from '../live-preview/live-preview.module';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SaveStatusModule,
    LivePreviewModule,

    // Materials
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
})
export class DmpActionsModule {}
