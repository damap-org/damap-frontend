import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import {
  FilterDialogComponent,
  RepoFilterComponent,
} from './repo-filter/repo-filter.component';
import { RepoRecommendationComponent } from './repo-recommendation/repo-recommendation.component';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { RetentionPeriodComponent } from './retention-period/retention-period.component';
import { RepoComponent } from './repo.component';
import { TranslateModule } from '@ngx-translate/core';
import { RepoPipe } from './repo.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageModule } from '../../../widgets/error-message/error-message.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { TreeSelectFormFieldModule } from '../../../widgets/tree-select-form-field/tree-select-form-field.module';
import { DatasetSourceModule } from '../../../pipes/dataset-source/dataset-source.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TagModule } from '../../../widgets/tag/tag.module';
import { InfoMessageModule } from '../../../widgets/info-message/info-message.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../../shared/shared.module';

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
