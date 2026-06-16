import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FilterDialogComponent,
  RepoFilterComponent,
} from './repo-filter.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';

describe('RepoFilterComponent', () => {
  let component: RepoFilterComponent;
  let fixture: ComponentFixture<RepoFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        TranslateTestingModule,
        RepoFilterComponent,
        FilterDialogComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
