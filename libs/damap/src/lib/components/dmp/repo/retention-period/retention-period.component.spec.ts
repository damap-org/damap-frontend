import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RetentionPeriodComponent } from './retention-period.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RetentionPeriodComponent', () => {
  let component: RetentionPeriodComponent;
  let fixture: ComponentFixture<RetentionPeriodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatExpansionModule,
        NoopAnimationsModule,
        TranslateTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RetentionPeriodComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionPeriodComponent);
    component = fixture.componentInstance;
    component.dmpForm = new UntypedFormGroup({
      datasets: new UntypedFormArray([
        new UntypedFormGroup({ retentionPeriod: new UntypedFormControl(null) }),
      ]),
    });
    component.datasets = component.dmpForm.get('datasets') as UntypedFormArray;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
