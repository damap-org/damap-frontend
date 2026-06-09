import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';

import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { InputWrapperComponent } from '../../../../shared/input-wrapper/input-wrapper.component';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TextareaWrapperComponent } from '../../../../shared/textarea-wrapper/textarea-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-dmp-external-storage',
  templateUrl: './external-storage.component.html',
  styleUrls: ['./external-storage.component.css'],
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    InputWrapperComponent,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatCardActions,
    MatSlideToggle,
    TextareaWrapperComponent,
    TranslateModule,
  ],
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

  anyNonInternalStorage(): boolean {
    let result = false;
    for (let control of this.externalStorageStep.controls) {
      if (!(control as UntypedFormGroup).controls.isManagedInternally.value) {
        result = true;
        break;
      }
    }
    return result;
  }
}
