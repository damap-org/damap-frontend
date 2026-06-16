import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { FILE_SIZES, FILE_TYPES } from '../data-specs';
import { FormService } from '../../../../services/form.service';

import { IdentifierTypeReusedData } from '../../../../domain/identifier-type';
import {
  ccBy,
  mit,
  LicenseDefinitions,
} from '../../../../widgets/license-wizard/license-wizard-list';

import { Dataset } from '../../../../domain/dataset';
import { DataSource } from '../../../../domain/enum/data-source.enum';
import { Identifier } from '../../../../domain/identifier';
import { DataType } from '../../../../domain/enum/data-type.enum';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { InputWrapperComponent } from '../../../../shared/input-wrapper/input-wrapper.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { LicenseWizardComponent } from '../../../../widgets/license-wizard/license-wizard.component';
import { TextareaWrapperComponent } from '../../../../shared/textarea-wrapper/textarea-wrapper.component';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { KeyValuePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dataset-dialog',
  templateUrl: './dataset-dialog.component.html',
  styleUrls: ['./dataset-dialog.component.css'],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    LicenseWizardComponent,
    TextareaWrapperComponent,
    MatIconButton,
    MatIcon,
    MatButton,
    MatDialogActions,
    KeyValuePipe,
    TranslateModule,
  ],
})
export class DatasetDialogComponent {
  dialogRef = inject<MatDialogRef<DatasetDialogComponent>>(MatDialogRef);
  private formService = inject(FormService);
  data = inject<{
    dataset: Dataset;
    mode: string;
  }>(MAT_DIALOG_DATA);

  readonly FILE_TYPES = FILE_TYPES;
  readonly FILE_SIZES = FILE_SIZES;
  readonly datasetSource: any = DataSource;
  readonly licenses = LicenseDefinitions;
  identifierTypeReusedData: any = IdentifierTypeReusedData;

  mode = 'add';
  dataset: UntypedFormGroup;
  datasetId: Identifier = {
    identifier: undefined,
    type: undefined,
  };

  originalOrder = (): number => 0;

  constructor() {
    const data = this.data;

    this.dataset = this.formService.mapDatasetToFormGroup(this.data.dataset);
    this.mode = data.mode ?? this.mode;
    if (data.dataset.datasetId) {
      this.datasetId = { ...data.dataset.datasetId };
    }
  }

  get title(): UntypedFormControl {
    return this.dataset.get('title') as UntypedFormControl;
  }

  get description(): UntypedFormControl {
    return this.dataset.get('description') as UntypedFormControl;
  }

  get fileFormat(): FormControl<string> {
    return this.dataset.get('fileFormat') as FormControl<string>;
  }

  get technicalResources(): FormArray {
    return this.dataset.get('technicalResources') as FormArray;
  }

  get license(): UntypedFormControl {
    return this.dataset.get('license') as UntypedFormControl;
  }

  addTechnicalResource(): void {
    this.technicalResources.push(this.formService.createTechnicalResource());
  }

  removeTechnicalResource(index: number): void {
    this.technicalResources.removeAt(index);
  }

  setLicenseSelectorResult(event: any) {
    if (event) {
      this.license.setValue(event.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose() {
    const dataset: Dataset = this.dataset.getRawValue();

    if (
      dataset.source == this.datasetSource.REUSED &&
      (this.datasetId.identifier != null || this.datasetId.type != null)
    ) {
      dataset.datasetId = this.datasetId;
    }

    if (dataset.license === null && dataset.source == this.datasetSource.NEW) {
      if (
        dataset.type.includes(DataType.SOURCE_CODE) &&
        dataset.type.length === 1
      ) {
        dataset.license = mit.id;
      } else {
        dataset.license = ccBy.id;
      }
    }

    this.dialogRef.close(dataset);
  }
}
