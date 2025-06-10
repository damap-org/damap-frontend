import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { EthicalAspectsComponent } from './ethical-aspects.component';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EthicalAspectsComponent', () => {
  let component: EthicalAspectsComponent;
  let fixture: ComponentFixture<EthicalAspectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatRadioModule, TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [EthicalAspectsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthicalAspectsComponent);
    component = fixture.componentInstance;
    component.legalEthicalStep = new UntypedFormGroup({
      humanParticipants: new UntypedFormControl(false),
      ethicalIssues: new UntypedFormControl(false),
      committeeReviewed: new UntypedFormControl(false),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
