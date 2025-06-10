import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionViewStoragesComponent } from './version-view-storages.component';

describe('VersionViewStoragesComponent', () => {
  let component: VersionViewStoragesComponent;
  let fixture: ComponentFixture<VersionViewStoragesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewStoragesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewStoragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
