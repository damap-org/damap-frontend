import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataMcComponent } from './data-mc.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DataMcComponent', () => {
  let component: DataMcComponent;
  let fixture: ComponentFixture<DataMcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DataMcComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
