import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { CostsComponent } from './costs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { StepIntroComponent } from '../../../widgets/step-intro/step-intro.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CostsComponent', () => {
  let component: CostsComponent;
  let fixture: ComponentFixture<CostsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatExpansionModule,
        MatRadioModule,
        MatIconModule,
        TranslateTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CostsComponent, StepIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsComponent);
    component = fixture.componentInstance;
    component.costsStep = new UntypedFormGroup({
      exist: new UntypedFormControl(true),
      list: new UntypedFormArray([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
