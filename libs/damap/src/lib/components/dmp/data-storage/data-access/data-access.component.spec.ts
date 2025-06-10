import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAccessComponent } from './data-access.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';

describe('DataAccessComponent', () => {
  let component: DataAccessComponent;
  let fixture: ComponentFixture<DataAccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        NoopAnimationsModule,
        TranslateTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DataAccessComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
