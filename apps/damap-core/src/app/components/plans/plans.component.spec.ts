import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach, afterEach, MockedObject } from 'vitest';

import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { DeleteWarningDialogComponent } from '../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { FormService } from '../../services/form.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlansComponent } from './plans.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { UntypedFormBuilder } from '@angular/forms';
import { mockDmpList } from '../../mocks/dmp-list-mocks';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { completeDmp } from '@damap-frontend-core/app/mocks/dmp-mocks';
import { OAuthService } from 'angular-oauth2-oidc';
import { DmpStore } from '@damap-frontend-core/app/data-access/dmp.store';
import { signal } from '@angular/core';
import { DmpListItem, Project } from '@damap-frontend-core';
import { LoadingState } from '@damap-frontend-core';
import { Dmp } from '@damap-frontend-core';
import { mockProject } from '@damap-frontend-core/app/mocks/project-mocks';

// TODO: These tests broke during the Angular migration to 22
// They should be fixed after the backendservice get dmp functions and the the dmp store have been unified to make mocking easier
describe.skip('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let loader: HarnessLoader;
  let authSpy: Partial<MockedObject<AuthService>>;
  let backendSpy: Partial<MockedObject<BackendService>>;
  let dmpStoreSpy: Partial<DmpStore>;

  const oauthServiceSpy = {
    getAccessToken: vi.fn(),
    hasValidAccessToken: vi.fn(),
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    dmpStoreSpy = {
      dmpById: vi.fn().mockName('DmpStore.dmpbyId'),
      loadDmps: vi.fn().mockName('DmpStore.loadDmps'),
      removeDmp: vi.fn().mockName('DmpStore.removeDmp'),
      createDmp: vi.fn().mockName('DmpStore.createDmp'),
      updateDmp: vi.fn().mockName('DmpStore.updateDmp'),
      exportDmp: vi.fn().mockName('DmpStore.exportDmp'),
      dmps: signal<DmpListItem[]>(mockDmpList),
      dmpsLoaded: signal(LoadingState.LOADED),
    };
    backendSpy = {
      getMaDmpJsonFile: vi.fn().mockName('BackendService.getMaDmpJsonFile'),
      getAllDmps: vi.fn().mockName('BackendService.getAllDmps'),
      getDmpById: vi.fn().mockName('BackendService.getDmpbyId'),
      deleteDmp: vi.fn().mockName('BackendService.deleteDmp'),
    };
    backendSpy.getAllDmps!.mockReturnValue(of(mockDmpList));
    authSpy = {
      isAdmin: vi.fn().mockName('AuthService.isAdmin'),
    };
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        TranslateTestingModule,
        DeleteWarningDialogComponent,
        NoopAnimationsModule,
        PlansComponent,
      ],
      providers: [
        { provide: BackendService, useValue: backendSpy },
        { provide: DmpStore, useValue: dmpStoreSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: OAuthService, useValue: oauthServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (id: number) => 1 } },
          },
        },
        UntypedFormBuilder,
        FormService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove dmps', async () => {
    authSpy.isAdmin!.mockReturnValue(true);
    backendSpy.deleteDmp!.mockReturnValue(of(completeDmp));

    component.deleteDmp(76);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    await buttons[1].click();

    expect(backendSpy.deleteDmp).toHaveBeenCalledWith(1);
  });

  it('should call getDmpDocument if funderSupported is true', async () => {
    vi.spyOn(component, 'getDocument');
    vi.spyOn(component, 'openExportWarningDialog');
    const funderSupportedDmp: Dmp = {
      ...completeDmp,
      project: {
        ...mockProject,
        funderSupported: true,
      },
    };
    backendSpy.getDmpById!.mockReturnValue(of(funderSupportedDmp));

    const id = 1;
    component.getDocument(id);
    await vi.advanceTimersByTimeAsync(0);

    expect(component.getDocument).toHaveBeenCalledTimes(1);
    expect(component.openExportWarningDialog).toHaveBeenCalledWith(true, id);
  });

  it('should call exportDmpTemplate and getDmpDocument if funderSupported is false', async () => {
    vi.spyOn(component, 'getDocument');
    vi.spyOn(component, 'openExportWarningDialog');
    const funderNotSupportedDmp: Dmp = {
      ...completeDmp,
      project: {
        ...mockProject,
        funderSupported: false,
      },
    };
    backendSpy.getDmpById!.mockReturnValue(of(funderNotSupportedDmp));

    const id = 1;
    const dialogRefMock: Partial<MatDialogRef<unknown, string>> = {
      componentInstance: { funderSupported: false },
      beforeClosed: () => of('some_template'),
      close: () => {},
    };

    const dialog = TestBed.inject(MatDialog);

    vi.spyOn(dialog, 'open').mockReturnValue(dialogRefMock as MatDialogRef<unknown, unknown>);

    component.getDocument(id);
    await fixture.whenStable();

    expect(component.getDocument).toHaveBeenCalledTimes(1);
    expect(component.openExportWarningDialog).toHaveBeenCalledWith(false, id);
    expect(dmpStoreSpy.exportDmp).toHaveBeenCalledWith(id, 'some_template');
  });
});
