import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { signal } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { DeleteWarningDialogComponent } from '../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { DmpApi } from '../../data-access/dmp.api';
import { DmpStore } from '../../data-access/dmp.store';
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
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { mockDmpList } from '../../mocks/dmp-list-mocks';
import { of } from 'rxjs';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let loader: HarnessLoader;
  let authSpy;
  let backendSpy;
  let dmpStoreSpy;
  let dmpApiSpy;

  beforeEach(waitForAsync(
    waitForAsync(() => {
      backendSpy = jasmine.createSpyObj('BackendService', [
        'getMaDmpJsonFile',
        'getDmpById',
        'getAllDmps',
        'deleteDmp',
      ]);
      backendSpy.getAllDmps.and.returnValue(of(mockDmpList));
      dmpStoreSpy = jasmine.createSpyObj('DmpStore', ['loadDmps', 'removeDmp']);
      dmpStoreSpy.dmps = signal(mockDmpList);
      dmpStoreSpy.dmpsLoaded = signal(LoadingState.LOADED);
      dmpApiSpy = jasmine.createSpyObj('DmpApi', [
        'exportDmp',
        'exportDmpTemplate',
      ]);
      dmpApiSpy.exportDmp.and.returnValue(of(undefined));
      dmpApiSpy.exportDmpTemplate.and.returnValue(of(undefined));
      authSpy = jasmine.createSpyObj('AuthService', [
        'hasValidAccessToken',
        'isAdmin',
      ]);
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
          { provide: DmpApi, useValue: dmpApiSpy },
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
    authSpy.isAdmin.and.returnValue(true);
    backendSpy.deleteDmp.and.returnValue(of({ status: 204 }));

    component.deleteDmp(1);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    await buttons[1].click();

    expect(backendSpy.deleteDmp).toHaveBeenCalledWith(1);
    expect(dmpStoreSpy.removeDmp).toHaveBeenCalledWith(1);
  }));

  it('should call getDmpDocument if funderSupported is true', fakeAsync(() => {
    spyOn(component, 'getDocument').and.callThrough();
    spyOn(component, 'openExportWarningDialog').and.callThrough();
    backendSpy.getDmpById.and.returnValue(
      of({ project: { funderSupported: true } }),
    );

    const id = 1;
    component.getDocument(id);
    tick();

    expect(component.getDocument).toHaveBeenCalledTimes(1);
    expect(component.openExportWarningDialog).toHaveBeenCalledWith(true, id);
  }));

  it('should call exportDmpTemplate and getDmpDocument if funderSupported is false', fakeAsync(() => {
    spyOn(component, 'getDocument').and.callThrough();
    spyOn(component, 'openExportWarningDialog').and.callThrough();
    backendSpy.getDmpById.and.returnValue(
      of({ project: { funderSupported: false } }),
    );

    const id = 1;
    const dialogRefMock = {
      componentInstance: { funderSupported: false },
      beforeClosed: () => of('some_template'),
      close: () => {},
    };

    spyOn((component as any).dialog, 'open').and.returnValue(dialogRefMock);

    component.getDocument(id);
    tick();

    expect(component.getDocument).toHaveBeenCalledTimes(1);
    expect(component.openExportWarningDialog).toHaveBeenCalledWith(false, id);
    expect(dmpApiSpy.exportDmpTemplate).toHaveBeenCalledWith(
      id,
      'some_template',
    );
  }));
});
