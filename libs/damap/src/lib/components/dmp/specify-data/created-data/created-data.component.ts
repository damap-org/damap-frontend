import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AbstractBaseDataComponent } from '../abstract-base-data.component';
import { Config } from '../../../../domain/config';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { DatasetDialogUploadComponent } from '../dataset-dialog/dataset-dialog-upload.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-created-data',
  templateUrl: './created-data.component.html',
  styleUrls: ['./created-data.component.css'],
  standalone: false,
})
export class CreatedDataComponent extends AbstractBaseDataComponent {
  @Input() fileUpload: { file: File; progress: number; finalized: boolean }[];
  @Input() config$: Observable<Config>;

  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  readonly tableHeaders: string[] = [
    'dataset',
    'datatype',
    'fileFormat',
    'size',
    'description',
    'actions',
  ];

  constructor(public dialog: MatDialog) {
    super();
  }

  openDatasetDialog() {
    const dialogRef = this.dialog.open(DatasetDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { dataset: { source: this.datasetSource.NEW } },
    });

    dialogRef.afterClosed().subscribe(dataset => {
      if (dataset) {
        this.datasetToAdd.emit(dataset);
      }
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(DatasetDialogUploadComponent, {
      width: '75%',
      maxWidth: '800px',
      data: {
        fileUpload: this.fileUpload,
        analyseFile: (file: File) => this.analyseFile(file),
        cancelUpload: (index: number) => this.cancelUpload(index),
      },
    });

    dialogRef.afterClosed().subscribe(dataset => {
      if (dataset) {
        this.datasetToAdd.emit(dataset);
      }
    });
  }
  get kind(): UntypedFormControl {
    return this.specifyDataStep.get('kind') as UntypedFormControl;
  }

  analyseFile(file: File) {
    this.fileToAnalyse.emit(file);
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }
}
