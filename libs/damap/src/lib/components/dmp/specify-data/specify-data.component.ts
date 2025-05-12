import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AbstractBaseDataComponent } from './abstract-base-data.component';
import { Config } from '../../../domain/config';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dmp-specify-data',
  templateUrl: './specify-data.component.html',
  styleUrls: ['./specify-data.component.css'],
  standalone: false,
})
export class SpecifyDataComponent extends AbstractBaseDataComponent {
  @Input() fileUpload: { file: File; progress: number; finalized: boolean }[];
  @Input() config$: Observable<Config>;

  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  fitsServiceAvailable$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  private configSubscription: Subscription;

  ngOnInit(): void {
    if (this.config$) {
      this.config$.subscribe(config => {
        this.fitsServiceAvailable$.next(!!config.fitsServiceAvailable);
        //console.log('fitsServiceAvailable updated in SpecifyDataComponent:', !!config.fitsServiceAvailable);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

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
