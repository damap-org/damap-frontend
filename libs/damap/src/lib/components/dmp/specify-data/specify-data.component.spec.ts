import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  closedDatasetMock,
  restrictedDatasetMock,
} from '../../../mocks/dataset-mocks';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { SpecifyDataComponent } from './specify-data.component';
import { StepIntroComponent } from '../../../widgets/step-intro/step-intro.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';

describe('SpecifyDataComponent', () => {
  let component: SpecifyDataComponent;
  let fixture: ComponentFixture<SpecifyDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatTabsModule,
        MatRadioModule,
        TranslateTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SpecifyDataComponent, StepIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new UntypedFormGroup({
      kind: new UntypedFormControl(null),
      explanation: new UntypedFormControl(''),
    });
    component.datasets = new UntypedFormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test abstract components functionality', () => {
    spyOn(component.datasetToAdd, 'emit');
    spyOn(component.updateDataset, 'emit');
    spyOn(component.removeDataset, 'emit');

    component.add(closedDatasetMock);
    expect(component.datasetToAdd.emit).toHaveBeenCalledOnceWith(
      closedDatasetMock,
    );
    component.update({ index: 0, update: restrictedDatasetMock });
    expect(component.updateDataset.emit).toHaveBeenCalledOnceWith({
      index: 0,
      update: restrictedDatasetMock,
    });
    component.remove(0);
    expect(component.removeDataset.emit).toHaveBeenCalledOnceWith(0);
  });

  it('should emit file to analyse', () => {
    spyOn(component.fileToAnalyse, 'emit');
    const file = new File([], 'test.txt');
    component.analyseFile(file);
    expect(component.fileToAnalyse.emit).toHaveBeenCalledOnceWith(file);
  });

  it('should cancel file upload', () => {
    spyOn(component.uploadToCancel, 'emit');
    component.cancelUpload(0);
    expect(component.uploadToCancel.emit).toHaveBeenCalledOnceWith(0);
  });
});
