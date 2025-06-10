import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExternalStorageComponent } from './external-storage.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ExternalStorageComponent', () => {
  let component: ExternalStorageComponent;
  let fixture: ComponentFixture<ExternalStorageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ExternalStorageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
