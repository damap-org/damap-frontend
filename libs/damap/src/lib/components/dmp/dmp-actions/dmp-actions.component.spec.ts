import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  DmpActionsComponent,
  SaveVersionDialogComponent,
} from './dmp-actions.component';
import { signal } from '@angular/core';
import { Subject, of } from 'rxjs';

import { BackendService } from '../../../services/backend.service';
import { DmpFormStore } from '../../../data-access/dmp-form.store';
import { DmpStore } from '../../../data-access/dmp.store';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FormTestingModule } from '../../../testing/form-testing/form-testing.module';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { LivePreviewComponent } from '../live-preview/live-preview.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { completeDmp } from '../../../mocks/dmp-mocks';

describe('DmpActionsComponent', () => {
  let component: DmpActionsComponent;
  let fixture: ComponentFixture<DmpActionsComponent>;
  let loader: HarnessLoader;
  let backendSpy: jasmine.SpyObj<BackendService>;
  let dmpStoreSpy;
  let formStoreSpy;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', [
    'open',
    'openFromComponent',
  ]);

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj(
      Object.getOwnPropertyNames(BackendService.prototype),
    );
    dmpStoreSpy = jasmine.createSpyObj('DmpStore', [
      'createDmp',
      'updateDmp',
      'saveDmpVersion',
      'exportDmp',
    ]);
    dmpStoreSpy.savingDmp = signal(false);
    dmpStoreSpy.createDmp.and.returnValue(of(completeDmp));
    dmpStoreSpy.updateDmp.and.returnValue(of(completeDmp));
    dmpStoreSpy.saveDmpVersion.and.returnValue(of(completeDmp));
    dmpStoreSpy.exportDmp.and.returnValue(of(null));
    formStoreSpy = jasmine.createSpyObj('DmpFormStore', ['setFormValue']);
    formStoreSpy.changed = signal(false);

    TestBed.configureTestingModule({
      imports: [
        ExportWarningDialogComponent,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        NoopAnimationsModule,
        TranslateTestingModule,
        FormTestingModule,
        LivePreviewComponent,
        DmpActionsComponent,
        SaveVersionDialogComponent,
      ],
      providers: [
        { provide: BackendService, useValue: backendSpy },
        { provide: DmpStore, useValue: dmpStoreSpy },
        { provide: DmpFormStore, useValue: formStoreSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpActionsComponent);
    component = fixture.componentInstance;
    component.stepChanged$ = new Subject<any>();
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save dmp on step and form change', waitForAsync(async () => {
    spyOn(component, 'saveDmp').and.callThrough();

    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(1);
  }));

  it('should open save dmp version dialog', waitForAsync(async () => {
    let dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);

    component.saveDmpVersion();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(1);

    await inputs[0].setValue('test');

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(11);

    expect(await buttons[5].getText()).toBe('actions-bar.buttons.save');
    expect(await buttons[5].isDisabled()).toBe(true);

    await buttons[6].click();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(2);
  }));

  it('should call dispatchExportDmp if funderSupported is true', waitForAsync(async () => {
    spyOn(component, 'dispatchExportDmp').and.callThrough();
    spyOn(component, 'exportDmpTemplate').and.callThrough();

    spyOn(component.dmpForm.controls.project, 'getRawValue').and.returnValue({
      funderSupported: true,
    });

    component.exportDmpTemplate();
    component.dispatchExportDmp();

    let dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    await dialogs[0].close();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);

    expect(component.exportDmpTemplate).toHaveBeenCalledTimes(1);
    expect(component.dispatchExportDmp).toHaveBeenCalledTimes(1);
  }));

  it('should call dispatchExportDmp if funderSupported is false', waitForAsync(async () => {
    spyOn(component, 'dispatchExportDmp').and.callThrough();
    spyOn(component, 'exportDmpTemplate').and.callThrough();

    spyOn(component.dmpForm.controls.project, 'getRawValue').and.returnValue({
      funderSupported: false,
    });

    const dialogRefMock = {
      componentInstance: { funderSupported: false },
      beforeClosed: () => of('show popup'),
      afterClosed: () => of(null),
      close: () => {},
    };

    spyOn((component as any).dialog, 'open').and.returnValue(dialogRefMock);

    component.exportDmpTemplate();

    await fixture.whenStable();

    expect(component.dispatchExportDmp).not.toHaveBeenCalled();
    expect((component as any).dialog.open).toHaveBeenCalled();
    expect(component.dmpForm.controls.project.getRawValue).toHaveBeenCalled();
  }));
});
