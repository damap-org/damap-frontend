import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  mockProjectSearchResult,
  mockRecommendedProjectSearchResult,
} from '../../../../mocks/search';

import { BackendService } from '../../../../services/backend.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectionListHarness } from '@angular/material/list/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from './project-list.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockProject } from '../../../../mocks/project-mocks';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFieldComponent } from '../../../../shared/search-field/search-field.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let loader: HarnessLoader;
  let backendSpy;

  beforeEach(async () => {
    vi.useFakeTimers();
    backendSpy = {
      getProjectSearchResult: vi.fn().mockName('BackendService.getProjectSearchResult'),
      getRecommendedProjects: vi.fn().mockName('BackendService.getRecommendedProjects'),
    };
    backendSpy.getProjectSearchResult = vi.fn().mockReturnValue(of(mockProjectSearchResult));
    backendSpy.getRecommendedProjects = vi
      .fn()
      .mockReturnValue(of(mockRecommendedProjectSearchResult));

    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        NoopAnimationsModule,
        ProjectListComponent,
        SearchFieldComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recommended projects after creation', async () => {
    // making sure that the input is initialized
    await loader.getHarness(MatInputHarness);
    await vi.advanceTimersByTimeAsync(350);
    await fixture.whenStable();
    expect(backendSpy.getRecommendedProjects).toHaveBeenCalled();
  });

  // Always fails with ExpressionChangedAfterItHasBeenCheckedError, seems like this is some problem
  // related to migrating away from zone.js change detection
  // Reactivate the test when we have completely removed zone.js
  // Removing changeDetection: ChangeDetectionStrategy.Eager from the component might help, but this requires rewrites
  it.skip('should change project on selection', async () => {
    vi.spyOn(component.projectToSet, 'emit').mockReturnValue(undefined);
    const input = await loader.getHarness(MatInputHarness);
    await input.setValue(mockProject.title);

    await vi.advanceTimersByTimeAsync(350);
    await fixture.whenStable();

    const list = await loader.getHarness(MatSelectionListHarness);
    const options = await list.getItems();

    expect(options.length).toBe(1);
    expect(await options[0].getFullText()).toContain(mockProject.title);

    await options[0].select();
    expect(component.projectToSet.emit).toHaveBeenCalled();
  });

  it('should call fetchRecommendedProjects when selectedProject is set to null', () => {
    vi.spyOn(component, 'fetchRecommendedProjects').mockReturnValue(undefined);
    component.selectedProject = null;
    expect(component.fetchRecommendedProjects).toHaveBeenCalled();
  });

  it('should use getRecommendedProjects when fetchRecommendedProjects is called', async () => {
    component.fetchRecommendedProjects();
    await vi.advanceTimersByTimeAsync(350);
    expect(backendSpy.getRecommendedProjects).toHaveBeenCalled();
  });

  it('should load projects on text input', async () => {
    const input = await loader.getHarness(MatInputHarness);
    await input.setValue(mockProject.title);
    await vi.advanceTimersByTimeAsync(350);
    await fixture.whenStable();
    expect(backendSpy.getProjectSearchResult).toHaveBeenCalled();
    await input.setValue('');
    await vi.advanceTimersByTimeAsync(350);
    await fixture.whenStable();
    expect(backendSpy.getRecommendedProjects).toHaveBeenCalled();
  });
});
