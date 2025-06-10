import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VersionViewProjectComponent } from './version-view-project.component';
import { mockProject } from '../../../../mocks/project-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VersionViewProjectComponent', () => {
  let component: VersionViewProjectComponent;
  let fixture: ComponentFixture<VersionViewProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VersionViewProjectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewProjectComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
