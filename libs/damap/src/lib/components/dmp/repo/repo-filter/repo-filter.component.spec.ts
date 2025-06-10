import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FilterDialogComponent,
  RepoFilterComponent,
} from './repo-filter.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';

describe('RepoFilterComponent', () => {
  let component: RepoFilterComponent;
  let fixture: ComponentFixture<RepoFilterComponent>;
  const initialState = { filters: null };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RepoFilterComponent, FilterDialogComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoFilterComponent);
    component = fixture.componentInstance;
    TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
