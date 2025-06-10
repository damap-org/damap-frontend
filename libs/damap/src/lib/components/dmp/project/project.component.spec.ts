import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackendService } from '../../../services/backend.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { mockProject } from '../../../mocks/project-mocks';
import { mockRecommendedProjectSearchResult } from '../../../mocks/search';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj('BackendService', [
      'getRecommendedProjects',
    ]);

    backendSpy.getRecommendedProjects.and.returnValue(
      of(mockRecommendedProjectSearchResult),
    );

    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ProjectComponent, ProjectListComponent],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit project change event', () => {
    spyOn(component.project, 'emit');
    component.changeProject(mockProject);
    expect(component.project.emit).toHaveBeenCalledWith(mockProject);
  });
});
