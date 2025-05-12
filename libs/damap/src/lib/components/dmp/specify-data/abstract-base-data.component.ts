import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dataset } from '../../../domain/dataset';
import { DataSource } from '../../../domain/enum/data-source.enum';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { DataKind } from '../../../domain/enum/data-kind.enum';

/* Tested in specify-data.component.spec.ts */
@Component({
  selector: 'app-base-data',
  template: '',
  standalone: false,
})
export abstract class AbstractBaseDataComponent {
  @Input() specifyDataStep: UntypedFormGroup;
  @Input() datasets: UntypedFormArray;

  @Output() datasetToAdd = new EventEmitter<Dataset>();
  @Output() updateDataset = new EventEmitter<{
    index: number;
    update: Dataset;
  }>();
  @Output() removeDataset = new EventEmitter<number>();

  readonly dataKind: any = DataKind;
  readonly datasetSource: any = DataSource;

  add(dataset: Dataset): void {
    this.datasetToAdd.emit(dataset);
  }

  update(update: { index: number; update: Dataset }) {
    this.updateDataset.emit(update);
  }

  remove(index: number): void {
    this.removeDataset.emit(index);
  }
}
