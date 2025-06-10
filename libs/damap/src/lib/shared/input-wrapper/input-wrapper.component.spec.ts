import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

import { InputWrapperComponent } from './input-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('InputFormFieldWrapperComponent', () => {
  let component: InputWrapperComponent;
  let fixture: ComponentFixture<InputWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateTestingModule,
      ],
      declarations: [InputWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWrapperComponent);
    component = fixture.componentInstance;
    component.label = 'Label';
    component.control = new UntypedFormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
