import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Dataset } from '../../../../domain/dataset';
import { DataSource } from '../../../../domain/enum/data-source.enum';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { FILE_SIZES } from '../data-specs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
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
    TranslateModule
],
})
export class DatasetInformationComponent {
  dataset: Dataset;
  readonly FILE_SIZES = FILE_SIZES;
  readonly datasetSource = DataSource;

  constructor(
    public dialogRef: MatDialogRef<DatasetDialogComponent>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA)
    public data: { dataset: Dataset; sourceType: DataSource },
  ) {
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
