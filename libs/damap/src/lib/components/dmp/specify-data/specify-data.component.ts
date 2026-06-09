import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AbstractBaseDataComponent } from './abstract-base-data.component';
import { Config } from '../../../domain/config';
import { UntypedFormControl } from '@angular/forms';

import { CreatedDataComponent } from './created-data/created-data.component';
import { ReusedDataComponent } from './reused-data/reused-data.component';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { MatHint } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-dmp-specify-data',
    templateUrl: './specify-data.component.html',
    styleUrls: ['./specify-data.component.css'],
    imports: [
    CreatedDataComponent,
    ReusedDataComponent,
    TextareaWrapperComponent,
    MatHint,
    TranslateModule
],
})
export class SpecifyDataComponent extends AbstractBaseDataComponent {
  @Input() fileUpload: { file: File; progress: number; finalized: boolean }[];
  @Input() config$: Observable<Config>;

  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  get dataGeneration(): UntypedFormControl {
    return this.specifyDataStep.get('dataGeneration') as UntypedFormControl;
  }

  get explanation(): UntypedFormControl {
    return this.specifyDataStep.get('explanation') as UntypedFormControl;
  }

  analyseFile(file: File) {
    this.fileToAnalyse.emit(file);
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
