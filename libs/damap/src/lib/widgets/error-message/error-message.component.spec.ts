import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ErrorMessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
