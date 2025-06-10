import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionViewDatasetsComponent } from './version-view-datasets.component';

describe('VersionViewDatasetsComponent', () => {
  let component: VersionViewDatasetsComponent;
  let fixture: ComponentFixture<VersionViewDatasetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewDatasetsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
