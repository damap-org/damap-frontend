import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepoComponent } from './repo.component';
import { StepIntroComponent } from '../../../widgets/step-intro/step-intro.component';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { UntypedFormArray } from '@angular/forms';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule, RepoComponent, StepIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    component.repoStep = new UntypedFormArray([]);
    component.datasets = new UntypedFormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
