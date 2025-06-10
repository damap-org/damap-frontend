import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepoTableComponent } from './repo-table.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RepoTableComponent', () => {
  let component: RepoTableComponent;
  let fixture: ComponentFixture<RepoTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RepoTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
