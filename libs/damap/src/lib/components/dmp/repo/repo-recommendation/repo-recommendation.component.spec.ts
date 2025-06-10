import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepoPipe } from '../repo.pipe';
import { RepoRecommendationComponent } from './repo-recommendation.component';
import { mockDetailRepo } from '../../../../mocks/repository-mocks';

describe('RepoRecommendationComponent', () => {
  let component: RepoRecommendationComponent;
  let fixture: ComponentFixture<RepoRecommendationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RepoRecommendationComponent, RepoPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoRecommendationComponent);
    component = fixture.componentInstance;
    component.recommended = [mockDetailRepo];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
