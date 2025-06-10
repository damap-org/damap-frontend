import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DmpTableComponent } from './dmp-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DmpTableComponent', () => {
  let component: DmpTableComponent;
  let fixture: ComponentFixture<DmpTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatIconModule, TranslateTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DmpTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
