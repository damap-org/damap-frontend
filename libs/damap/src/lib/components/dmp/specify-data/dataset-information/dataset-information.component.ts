import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Dataset } from '../../../../domain/dataset';
import { DataSource } from '../../../../domain/enum/data-source.enum';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { FILE_SIZES } from '../data-specs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-information-component',
  templateUrl: './dataset-information.component.html',
  styleUrls: ['./dataset-information.component.css'],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    TranslatePipe],
})
export class DatasetInformationComponent {
  dialogRef = inject<MatDialogRef<DatasetDialogComponent>>(MatDialogRef);
  private translate = inject(TranslateService);
  data = inject<{
    dataset: Dataset;
    sourceType: DataSource;
  }>(MAT_DIALOG_DATA);

  dataset: Dataset;
  readonly FILE_SIZES = FILE_SIZES;
  readonly datasetSource = DataSource;

  constructor() {
    const data = this.data;

    this.dataset = data.dataset;
  }

  onDialogClose(): void {
    this.dialogRef.close();
  }

  mapFileSize(fileSize: number): string {
    const size = FILE_SIZES.find(size => fileSize == size.size);
    return size ? size.label : 'Default';
  }

  getDataType(dataset: Dataset): string {
    let type = '';
    dataset.type.forEach((t, index) => {
      this.translate
        .get(`enum.dataset.type.${t}`)
        .subscribe((translated: string) => {
          type += translated;
          if (index < dataset.type.length - 1) {
            type += ', ';
          }
        });
    });
    return type;
  }
}
