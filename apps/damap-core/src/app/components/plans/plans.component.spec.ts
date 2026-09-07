import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { DeleteWarningDialogComponent } from '../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { FormService } from '../../services/form.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlansComponent } from './plans.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { UntypedFormBuilder } from '@angular/forms';
import { mockDmpList } from '../../mocks/dmp-list-mocks';
import { of } from 'rxjs';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let loader: HarnessLoader;
  let authSpy;
  let backendSpy;
  const initialState = {
    damap: { dmps: { loaded: true, entities: mockDmpList, ids: [1] } },
  };

  beforeEach(waitForAsync(
    waitForAsync(() => {
      backendSpy = {
        getDmpDocument: vi.fn().mockName('BackendService.getDmpDocument'),
        getMaDmpJsonFile: vi.fn().mockName('BackendService.getMaDmpJsonFile'),
        getDmpById: vi.fn().mockName('BackendService.getDmpById'),
        getAllDmps: vi.fn().mockName('BackendService.getAllDmps'),
        deleteDmp: vi.fn().mockName('BackendService.deleteDmp'),
        exportDmpTemplate: vi.fn().mockName('BackendService.exportDmpTemplate'),
      };
      backendSpy.getAllDmps.mockReturnValue(of(mockDmpList));
      authSpy = {
        hasValidAccessToken: vi.fn().mockName('AuthService.hasValidAccessToken'),
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
        ],
        declarations: [PlansComponent],
        providers: [
          { provide: BackendService, useValue: backendSpy },
          { provide: AuthService, useValue: authSpy },
          UntypedFormBuilder,
          FormService,
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(PlansComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    }),
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove dmps', waitForAsync(async () => {
    authSpy.isAdmin.mockReturnValue(true);
    backendSpy.deleteDmp.mockReturnValue(of({ status: 204 }));

    component.deleteDmp(1);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    await buttons[1].click();

    expect(backendSpy.deleteDmp).toHaveBeenCalledWith(1);
  }));

  it('should call getDmpDocument if funderSupported is true', fakeAsync(() => {
    vi.spyOn(component, 'getDocument');
    vi.spyOn(component, 'openExportWarningDialog');
    backendSpy.getDmpById.mockReturnValue(of({ project: { funderSupported: true } }));

    const id = 1;
    component.getDocument(id);
    tick();

    expect(component.getDocument).toHaveBeenCalledTimes(1);
    expect(component.openExportWarningDialog).toHaveBeenCalledWith(true, id);
  }));

  it('should call exportDmpTemplate and getDmpDocument if funderSupported is false', fakeAsync(() => {
    vi.spyOn(component, 'getDocument');
    vi.spyOn(component, 'openExportWarningDialog');
    backendSpy.getDmpById.mockReturnValue(of({ project: { funderSupported: false } }));

    const id = 1;
    const dialogRefMock = {
      componentInstance: { funderSupported: false },
      beforeClosed: () => of('some_template'),
      close: () => {},
    };

    vi.spyOn((component as any).dialog, 'open').mockReturnValue(dialogRefMock);

    component.getDocument(id);
    tick();

    expect(component.getDocument).toHaveBeenCalledTimes(1);
    expect(component.openExportWarningDialog).toHaveBeenCalledWith(false, id);
    expect(backendSpy.exportDmpTemplate).toHaveBeenCalledWith(id, 'some_template');
  }));
});
