import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReuseComponent } from './reuse.component';
import { StepIntroComponent } from '../../../widgets/step-intro/step-intro.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

describe('ReuseComponent', () => {
  let component: ReuseComponent;
  let fixture: ComponentFixture<ReuseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        TranslateTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReuseComponent, StepIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuseComponent);
    component = fixture.componentInstance;
    component.reuseStep = new UntypedFormGroup({});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
