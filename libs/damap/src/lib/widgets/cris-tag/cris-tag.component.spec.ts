import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrisTagComponent } from './cris-tag.component';

describe('CrisTagComponent', () => {
  let component: CrisTagComponent;
  let fixture: ComponentFixture<CrisTagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrisTagComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
