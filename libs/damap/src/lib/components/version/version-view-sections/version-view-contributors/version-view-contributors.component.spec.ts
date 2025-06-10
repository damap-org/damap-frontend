import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionViewContributorsComponent } from './version-view-contributors.component';

describe('VersionViewContributorsComponent', () => {
  let component: VersionViewContributorsComponent;
  let fixture: ComponentFixture<VersionViewContributorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewContributorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
