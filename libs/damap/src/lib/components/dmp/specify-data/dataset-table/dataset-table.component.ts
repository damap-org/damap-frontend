import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';

import { DataSource } from '../../../../domain/enum/data-source.enum';
import { Dataset } from '../../../../domain/dataset';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { FILE_SIZES } from '../data-specs';
import { MatDialog } from '@angular/material/dialog';
import { DatasetInformationComponent } from '../dataset-information/dataset-information.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dataset-table',
  templateUrl: './dataset-table.component.html',
  styleUrls: ['./dataset-table.component.css'],
})
export class DatasetTableComponent {
  readonly FILE_SIZES = FILE_SIZES;
  @Input() datasets: UntypedFormArray;
  @Input() sourceType: DataSource = DataSource.NEW;

  @Input() tableHeaders: string[] = ['dataset', 'actions'];
  @Input() tableHeading: string;
  @Input() tableIntro = 'dmp.steps.data.specify.intro.default';

  @Output() removeDataset = new EventEmitter<number>();
  @Output() updateDataset = new EventEmitter<{
    index: number;
    update: Dataset;
  }>();

  readonly datasetSource: any = DataSource;

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  getSizeLabel(size: number): string {
    if (size === -1) {
      return "I don't know yet";
    }
    const foundSize = this.FILE_SIZES.find(option => size <= option.size);
    return foundSize ? foundSize.label : 'Size not defined';
  }

  openDatasetDialog(dataset: Dataset) {
    const index = this.findFormArrayIndex(dataset);
    const datasetGroup = this.datasets.at(index) as UntypedFormGroup;
    const dialogRef = this.dialog.open(DatasetDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { dataset: datasetGroup.getRawValue(), mode: 'edit' },
    });

    dialogRef.afterClosed().subscribe(update => {
      if (update) {
        this.updateDataset.emit({ index, update });
      }
    });
  }

  openInformationDialog(dataset: Dataset) {
    const index = this.findFormArrayIndex(dataset);
    const datasetGroup = this.datasets.at(index) as UntypedFormGroup;
    const dialogRef = this.dialog.open(DatasetInformationComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { dataset: datasetGroup.getRawValue() },
    });
  }

  remove(dataset: Dataset): void {
    const index = this.findFormArrayIndex(dataset);
    this.removeDataset.emit(index);
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

  private findFormArrayIndex(dataset: Dataset): number {
    return this.datasets.value.findIndex(d =>
      d.id ? d.id === dataset.id : d.referenceHash === dataset.referenceHash,
    );
  }
}
