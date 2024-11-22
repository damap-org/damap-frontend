import { ByteModule } from '../../../pipes/byte/byte.module';
import { CommonModule } from '@angular/common';
import { CreatedDataComponent } from './created-data/created-data.component';
import { DataMcComponent } from './data-mc/data-mc.component';
import { DatasetDialogComponent } from './dataset-dialog/dataset-dialog.component';
import { DatasetDialogUploadComponent } from './dataset-dialog/dataset-dialog-upload.component';
import { DatasetSourceModule } from '../../../pipes/dataset-source/dataset-source.module';
import { DatasetTableComponent } from './dataset-table/dataset-table.component';
import { DoiSearchModule } from '../../../widgets/doi-search/doi-search.module';
import { FileUploadModule } from '../../../widgets/file-upload/file-upload.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReusedDataComponent } from './reused-data/reused-data.component';
import { SharedModule } from '../../../shared/shared.module';
import { SpecifyDataComponent } from './specify-data.component';
import { SpecifyDataInstructionComponent } from './specify-data-instruction/specify-data-instruction.component';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { ToggleButtonsModule } from '../../../widgets/toggle-buttons/toggle-buttons.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FileUploadModule,
    StepIntroModule,
    ByteModule,
    SharedModule,
    DatasetSourceModule,
    DoiSearchModule,
    ToggleButtonsModule,

    // Materials
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
  ],
  declarations: [
    SpecifyDataComponent,
    DatasetDialogComponent,
    CreatedDataComponent,
    ReusedDataComponent,
    DatasetTableComponent,
    DataMcComponent,
    DatasetDialogUploadComponent,
    SpecifyDataInstructionComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FileUploadModule,
    StepIntroModule,
    ByteModule,
    SharedModule,
    SpecifyDataComponent,
    DoiSearchModule,
    ToggleButtonsModule,
    SpecifyDataInstructionComponent,
    DatasetDialogUploadComponent,

    // Materials
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
  ],
})
export class SpecifyDataModule {}
