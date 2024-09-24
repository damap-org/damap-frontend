import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  DmpActionsComponent,
  SaveVersionDialogComponent,
} from './dmp-actions.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject, of } from 'rxjs';

import { ExportWarningModule } from '../../../widgets/export-warning-dialog/export-warning.module';
import { FormTestingModule } from '../../../testing/form-testing/form-testing.module';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../testing/translate-testing/translate-testing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { LivePreviewModule } from '../live-preview/live-preview.module';
import { LivePreviewComponent } from '../live-preview/live-preview.component';

describe('DmpActionsComponent', () => {
  let component: DmpActionsComponent;
  let fixture: ComponentFixture<DmpActionsComponent>;
  let loader: HarnessLoader;
  let store: MockStore;
  let backendSpy: jasmine.SpyObj<BackendService>;
  const initialState = {
    damap: {
      form: { dmp: null, changed: false },
      dmps: { saving: false },
    },
  };

  beforeEach(waitForAsync(() => {
    backendSpy = jasmine.createSpyObj(
      Object.getOwnPropertyNames(BackendService.prototype),
    );

    TestBed.configureTestingModule({
      imports: [
        ExportWarningModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        NoopAnimationsModule,
        TranslateTestingModule,
        FormTestingModule,
        LivePreviewModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DmpActionsComponent, SaveVersionDialogComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: BackendService, useValue: backendSpy },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
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
    spyOn(store, 'dispatch');

    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(0);

    component.formChanged = true;
    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  }));

  it('should dispatch save dmp version action', waitForAsync(async () => {
    spyOn(store, 'dispatch');

    let dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);

    component.saveDmpVersion();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(1);

    await inputs[0].setValue('test');
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(7);
    expect(await buttons[6].getText()).toBe('dmp.dialog.button.save');
    expect(await buttons[6].isDisabled()).toBe(false);

    await buttons[6].click();
    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(dialogs.length).toBe(0);
  }));

  it('should call dispatchExportDmp if funderSupported is true', waitForAsync(async () => {
    spyOn(component, 'dispatchExportDmp').and.callThrough();
    spyOn(component, 'exportDmpTemplate').and.callThrough();

    spyOn(component.dmpForm.controls.project, 'getRawValue').and.returnValue({
      funderSupported: true,
    });

    component.exportDmpTemplate();
    spyOn(store, 'dispatch').and.callThrough();
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
