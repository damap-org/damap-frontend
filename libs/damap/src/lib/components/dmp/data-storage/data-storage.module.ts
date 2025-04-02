import { CommonModule } from '@angular/common';
import { DataAccessComponent } from './data-access/data-access.component';
import { DataStorageInstructionComponent } from './data-storage-instruction/data-storage-instruction.component';
import { ExternalStorageComponent } from './external-storage/external-storage.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { StepIntroModule } from '../../../widgets/step-intro/step-intro.module';
import { StorageComponent } from './storage/storage.component';
import { StorageFilterPipe } from './storage/storage-filter.pipe';
import { StorageInfoDialogComponent } from './storage-dialog/storage-info-dialog.component';
import { ToggleButtonsModule } from '../../../widgets/toggle-buttons/toggle-buttons.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,
    ToggleButtonsModule,

    // Materials
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggle,
  ],
  declarations: [
    DataAccessComponent,
    ExternalStorageComponent,
    StorageComponent,
    StorageFilterPipe,
    DataStorageInstructionComponent,
    StorageInfoDialogComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    StepIntroModule,
    DataAccessComponent,
    ExternalStorageComponent,
    StorageComponent,
    DataStorageInstructionComponent,
    StorageInfoDialogComponent,

    // Materials
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class DataStorageModule {}
