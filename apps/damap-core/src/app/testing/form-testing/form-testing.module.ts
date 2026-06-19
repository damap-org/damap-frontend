import { Injectable, NgModule } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Injectable()
export class FormServiceStub extends FormService {
  // Override to always have a fresh form.
  override get dmpForm() {
    return new FormGroup({
      id: new FormControl(null),
      project: new FormControl(),
      data: new FormGroup({ kind: new FormControl('SPECIFY') }),
      datasets: new FormArray([]),
      documentation: new FormGroup({}),
      legal: new FormGroup({}),
      storage: new FormArray([]),
      externalStorage: new FormArray([]),
      externalStorageInfo: new FormControl(),
      repositories: new FormArray([]),
      reuse: new FormGroup({}),
      costs: new FormGroup({}),
    });
  }
}

@NgModule({
  providers: [
    { provide: FormService, useClass: FormServiceStub },
    { provide: UntypedFormBuilder, useClass: UntypedFormBuilder },
  ],
})
export class FormTestingModule {}
