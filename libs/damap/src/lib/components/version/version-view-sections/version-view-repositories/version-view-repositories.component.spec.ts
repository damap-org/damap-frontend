import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionViewRepositoriesComponent } from './version-view-repositories.component';

describe('VersionViewRepositoriesComponent', () => {
  let component: VersionViewRepositoriesComponent;
  let fixture: ComponentFixture<VersionViewRepositoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewRepositoriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
