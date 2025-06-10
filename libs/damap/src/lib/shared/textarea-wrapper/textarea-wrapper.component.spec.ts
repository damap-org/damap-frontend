import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextareaWrapperComponent } from './textarea-wrapper.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TextareaWrapperComponent', () => {
  let component: TextareaWrapperComponent;
  let fixture: ComponentFixture<TextareaWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TextareaWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWrapperComponent);
    component = fixture.componentInstance;
    component.label = 'Label';
    component.control = new UntypedFormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the value of isAutocompleteOpen to false', () => {
    component.closeAutocomplete();
    expect(component.isAutocompleteOpen).toBe(false);
  });

  it('should change the value to isAutocompleteOpen to true', () => {
    component.openAutocomplete();
    expect(component.isAutocompleteOpen).toBe(true);
  });
});
