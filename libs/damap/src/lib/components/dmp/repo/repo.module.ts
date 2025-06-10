import {
  FilterDialogComponent,
  RepoFilterComponent,
} from './repo-filter/repo-filter.component';

import { CommonModule } from '@angular/common';
import { DatasetSourceModule } from '../../../pipes/dataset-source/dataset-source.module';
import { ErrorMessageModule } from '../../../widgets/error-message/error-message.module';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepoComponent } from './repo.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoInstructionComponent } from './repo-instruction/repo-instruction.component';
import { RepoPipe } from './repo.pipe';
import { RepoRecommendationComponent } from './repo-recommendation/repo-recommendation.component';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { RetentionPeriodComponent } from './retention-period/retention-period.component';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { TagModule } from '../../../widgets/tag/tag.module';
import { ToggleButtonsModule } from '../../../widgets/toggle-buttons/toggle-buttons.module';
import { TranslateModule } from '@ngx-translate/core';
import { TreeSelectFormFieldModule } from '../../../widgets/tree-select-form-field/tree-select-form-field.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    ErrorMessageModule,
    TreeSelectFormFieldModule,
    DatasetSourceModule,
    TagModule,
    ToggleButtonsModule,
    InfoMessageModule,
    SharedModule,

    // Materials
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  declarations: [
    RepoDetailsComponent,
    RepoFilterComponent,
    FilterDialogComponent,
    RepoRecommendationComponent,
    RepoTableComponent,
    RetentionPeriodComponent,
    RepoComponent,
    RepoPipe,
    RepoInstructionComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    StepIntroModule,
    ErrorMessageModule,
    TreeSelectFormFieldModule,
    DatasetSourceModule,
    TagModule,
    RepoComponent,
    RepoInstructionComponent,
    SharedModule,

    // Materials
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
  ],
})
export class RepoModule {}
