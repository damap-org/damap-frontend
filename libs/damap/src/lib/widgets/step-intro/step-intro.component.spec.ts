import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepIntroComponent } from './step-intro.component';

describe('IntroComponent', () => {
  let component: StepIntroComponent;
  let fixture: ComponentFixture<StepIntroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
