import { describe, expect, it, vi, beforeEach, type MockedObject, afterEach } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Subject, of, take } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { Config } from '../../domain/config';
import { DmpComponent } from './dmp.component';
import { FeedbackService } from '../../services/feedback.service';
import { FormTestingModule } from '../../testing/form-testing/form-testing.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperHarness } from '@angular/material/stepper/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CdkStep, StepperSelectionEvent } from '@angular/cdk/stepper';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { completeDmp } from '../../mocks/dmp-mocks';
import { configMockData } from '../../mocks/config-service-mocks';
import { mockContributor1 } from '../../mocks/contributor-mocks';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpResponse } from '@angular/common/http';
import { DmpStore } from '@damap-frontend-core/app/data-access/dmp.store';

describe('DmpComponent', () => {
  let component: DmpComponent;
  let fixture: ComponentFixture<DmpComponent>;
  let loader: HarnessLoader;
  let authSpy;
  let backendSpy: MockedObject<BackendService>;
  let feedbackSpy;
  const oauthServiceSpy = {
    getAccessToken: vi.fn().mockReturnValue('test-token'),
    hasValidAccessToken: vi.fn().mockReturnValue(true),
    logOut: vi.fn(),
  };
  const dmpStoreSpy = {
    exportDmp: vi.fn().mockReturnValue(of(null)),
    savingDmp: signal(false),
    createDmp: vi.fn().mockReturnValue(of(completeDmp)),
  };

  beforeEach(async () => {
    authSpy = {
      getDisplayName: vi.fn().mockName('AuthService.getDisplayName'),
      isAdmin: vi.fn().mockName('AuthService.isAdmin'),
    };
    authSpy.getDisplayName.mockReturnValue('name');
    authSpy.isAdmin.mockReturnValue(false);
    feedbackSpy = {
      error: vi.fn().mockName('FeedbackService.error'),
      success: vi.fn().mockName('FeedbackService.success'),
    };
    backendSpy = Object.fromEntries(
      Object.getOwnPropertyNames(BackendService.prototype)
        .filter((name) => name !== 'constructor')
        .map((name) => [name, vi.fn().mockName(`BackendService.${name}`)]),
    ) as unknown as MockedObject<BackendService>;
    backendSpy.loadServiceConfig.mockReturnValue(of(configMockData));
    backendSpy.getDmpById.mockReturnValue(of(completeDmp));
    backendSpy.getProjectMembers.mockReturnValue(of([mockContributor1]));
    backendSpy.analyseFileData.mockReturnValue(of(new HttpResponse({ status: 200 })));
    backendSpy.getRecommendedProjects.mockReturnValue(
      of({
        search: {
          pagination: {
            page: 0,
            perPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
          query: '',
        },
        items: [],
      }),
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatStepperModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          /*{path: 'plans', component: PlansComponent}*/
        ]),
        TranslateTestingModule,
        FormTestingModule,
        DmpComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (id: number) => completeDmp.id } },
          },
        },
        { provide: BackendService, useValue: backendSpy },
        { provide: FeedbackService, useValue: feedbackSpy },
        {
          provide: OAuthService,
          useValue: oauthServiceSpy,
        },
        {
          provide: DmpStore,
          useValue: dmpStoreSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DmpComponent);
    component = fixture.componentInstance;
    component.config$ = new Subject<Config>();

    fixture.detectChanges();
    await fixture.whenStable();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load service config and publish the result into config$ observable', () => {
      expect(backendSpy.loadServiceConfig).toHaveBeenCalled();
      component.config$.pipe(take(1)).subscribe((config) => {
        expect(config).toEqual(configMockData);
      });
    });
  });

  it('should load all stepper harnesses and get steps of stepper', async () => {
    const steppers = await loader.getAllHarnesses(MatStepperHarness);
    expect(steppers.length).toBe(1);

    const stepper = await loader.getHarness(MatStepperHarness);
    const steps = await stepper.getSteps();
    expect(steps.length).toEqual(11);
  });

  it('should handle step change correctly', () => {
    const event: StepperSelectionEvent = {
      selectedIndex: 2,
      previouslySelectedIndex: 1,
      selectedStep: {} as CdkStep,
      previouslySelectedStep: {} as CdkStep,
    };

    vi.spyOn(component, 'changeStep');
    vi.spyOn(component, 'changeStepPosition').mockImplementation(() => {});
    vi.spyOn(component, 'onStepChange');

    component.handleStepChange(event);

    expect(component.changeStep).toHaveBeenCalledWith(event);
    expect(component.changeStepPosition).toHaveBeenCalledWith(event);
    expect(component.onStepChange).toHaveBeenCalledWith(event.selectedIndex);
  });

  it('should test showStep', () => {
    expect(component.showStep).toBeFalsy();

    component.datasets.push(new UntypedFormControl({}));
    expect(component.showStep).toBeTruthy();
  });

  it('should fetch project members onInit', () => {
    expect(backendSpy.getDmpById).toHaveBeenCalledTimes(1);
  });
});
