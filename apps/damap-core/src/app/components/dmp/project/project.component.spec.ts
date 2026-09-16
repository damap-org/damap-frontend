import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

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
import { OAuthService } from 'angular-oauth2-oidc';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let backendSpy;

  const oauthServiceSpy = {
    getAccessToken: vi.fn().mockReturnValue('test-token'),
    hasValidAccessToken: vi.fn().mockReturnValue(true),
    logOut: vi.fn(),
  };

  beforeEach(async () => {
    backendSpy = {
      getRecommendedProjects: vi.fn().mockName('BackendService.getRecommendedProjects'),
    };

    backendSpy.getRecommendedProjects.mockReturnValue(of(mockRecommendedProjectSearchResult));

    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        ProjectComponent,
        ProjectListComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BackendService, useValue: backendSpy },
        {
          provide: OAuthService,
          useValue: oauthServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit project change event', () => {
    vi.spyOn(component.project, 'emit').mockReturnValue(undefined);
    component.changeProject(mockProject);
    expect(component.project.emit).toHaveBeenCalledWith(mockProject);
  });
});
