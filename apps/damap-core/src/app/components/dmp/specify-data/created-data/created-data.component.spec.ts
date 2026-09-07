import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Config } from '../../../../domain/config';
import { CreatedDataComponent } from './created-data.component';
import { DataKind } from '../../../../domain/enum/data-kind.enum';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { configMockData } from '../../../../mocks/config-service-mocks';

describe('CreatedDataComponent', () => {
  let component: CreatedDataComponent;
  let fixture: ComponentFixture<CreatedDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CreatedDataComponent, DatasetDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDataComponent);
    component = fixture.componentInstance;
    component.config$ = new BehaviorSubject<Config>(configMockData);
    component.specifyDataStep = new UntypedFormGroup({
      kind: new UntypedFormControl(DataKind.NONE),
      explanation: new UntypedFormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit file to analyse', () => {
    vi.spyOn(component.fileToAnalyse, 'emit').mockReturnValue(undefined);
    const file = new File([], 'test.txt');
    component.analyseFile(file);
    expect(component.fileToAnalyse.emit).toHaveBeenCalledTimes(1);
    expect(component.fileToAnalyse.emit).toHaveBeenCalledWith(file);
  });

  it('should cancel file upload', () => {
    vi.spyOn(component.uploadToCancel, 'emit').mockReturnValue(undefined);
    component.cancelUpload(0);
    expect(component.uploadToCancel.emit).toHaveBeenCalledTimes(1);
    expect(component.uploadToCancel.emit).toHaveBeenCalledWith(0);
  });
});
