import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { LegalEthicalAspectsComponent } from './legal-ethical-aspects.component';
import { MatRadioModule } from '@angular/material/radio';
import { StepIntroComponent } from '../../../widgets/step-intro/step-intro.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LegalEthicalAspectsComponent', () => {
  let component: LegalEthicalAspectsComponent;
  let fixture: ComponentFixture<LegalEthicalAspectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatRadioModule, TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [LegalEthicalAspectsComponent, StepIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalEthicalAspectsComponent);
    component = fixture.componentInstance;
    component.legalEthicalStep = new UntypedFormGroup({
      sensitiveData: new UntypedFormControl(true),
      sensitiveDataAccess: new UntypedFormControl(''),
      personalData: new UntypedFormControl(true),
      otherPersonalDataCompliance: new UntypedFormControl([]),
      otherDataSecurityMeasures: new UntypedFormControl(''),
      legalRestrictions: new UntypedFormControl(true),
      legalRestrictionsComment: new UntypedFormControl(''),
      otherLegalRestrictionsDocuments: new UntypedFormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
