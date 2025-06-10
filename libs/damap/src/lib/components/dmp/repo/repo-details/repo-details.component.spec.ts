import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepoDetailsComponent } from './repo-details.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockDetailRepo } from '../../../../mocks/repository-mocks';

describe('RepoRecommendationComponent', () => {
  let component: RepoDetailsComponent;
  let fixture: ComponentFixture<RepoDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [RepoDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetailsComponent);
    component = fixture.componentInstance;
    component.repo = mockDetailRepo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
