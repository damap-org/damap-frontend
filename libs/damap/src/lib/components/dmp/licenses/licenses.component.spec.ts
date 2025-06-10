import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicensesComponent } from './licenses.component';
import { MatCardModule } from '@angular/material/card';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';

describe('LicensesComponent', () => {
  let component: LicensesComponent;
  let fixture: ComponentFixture<LicensesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, TranslateTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LicensesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
