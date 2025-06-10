import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DataQualityType } from '../../../domain/enum/data-quality-type.enum';
import { DocDataQualityComponent } from './doc-data-quality.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StepIntroComponent } from '../../../widgets/step-intro/step-intro.component';
import { TextareaWrapperComponent } from '../../../shared/textarea-wrapper/textarea-wrapper.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';

describe('DocDataQualityComponent', () => {
  let component: DocDataQualityComponent;
  let fixture: ComponentFixture<DocDataQualityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, TranslateTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        DocDataQualityComponent,
        StepIntroComponent,
        TextareaWrapperComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDataQualityComponent);
    component = fixture.componentInstance;
    component.docDataStep = new UntypedFormGroup({
      metadata: new UntypedFormControl(''),
      dataGeneration: new UntypedFormControl(''),
      structure: new UntypedFormControl(''),
      dataQuality: new UntypedFormControl([DataQualityType.OTHERS]),
      otherDataQuality: new UntypedFormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
