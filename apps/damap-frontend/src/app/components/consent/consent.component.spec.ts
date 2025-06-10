import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsentComponent } from './consent.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateTestingModule } from '@damap/core';

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [ConsentComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
