import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-dmp-external-storage',
  templateUrl: './external-storage.component.html',
  styleUrls: ['./external-storage.component.css'],
  standalone: false,
})
export class ExternalStorageComponent {
  @Input() externalStorageStep: UntypedFormArray;
  @Input() datasets: UntypedFormArray;
  @Input() externalStorageInfo: UntypedFormControl = new UntypedFormControl();

  @Output() externalStorageToAdd = new EventEmitter();
  @Output() externalStorageToRemove = new EventEmitter<number>();

  getFormControl(index: number, controlName: string): UntypedFormControl {
    return (this.externalStorageStep?.at(index) as UntypedFormGroup)?.controls[
      controlName
    ] as UntypedFormControl;
  }

  addExternalStorage() {
    this.externalStorageToAdd.emit();
  }

  removeExternalStorage(index: number) {
    this.externalStorageToRemove.emit(index);
  }
}
