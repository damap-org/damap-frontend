import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach, type MockedObject } from 'vitest';
import { DmpActionsComponent, SaveVersionDialogComponent } from './dmp-actions.component';
import { Subject, of } from 'rxjs';

import { BackendService } from '../../../services/backend.service';
import { FormTestingModule } from '../../../testing/form-testing/form-testing.module';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
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

describe('DmpActionsComponent', () => {
  let component: DmpActionsComponent;
  let fixture: ComponentFixture<DmpActionsComponent>;
  let loader: HarnessLoader;
  let backendSpy: MockedObject<BackendService>;

  const matSnackBarSpy = {
    open: vi.fn().mockName('MatSnackBar.open'),
    openFromComponent: vi.fn().mockName('MatSnackBar.openFromComponent'),
  };

  beforeEach(waitForAsync(() => {
    backendSpy = Object.fromEntries(
      Object.getOwnPropertyNames(BackendService.prototype)
        .filter((name) => name !== 'constructor')
        .map((name) => [name, vi.fn()]),
    ) as unknown as MockedObject<BackendService>;

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        NoopAnimationsModule,
        TranslateTestingModule,
        FormTestingModule,
      ],
      declarations: [DmpActionsComponent, SaveVersionDialogComponent],
      providers: [
        { provide: BackendService, useValue: backendSpy },
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
    vi.spyOn(component, 'saveDmp');

    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(1);

    component.formChanged = true;
    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(2);
  }));

  it('should dispatch save dmp version action', waitForAsync(async () => {
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
    vi.spyOn(component, 'dispatchExportDmp');
    vi.spyOn(component, 'exportDmpTemplate');

    vi.spyOn(component.dmpForm.controls.project, 'getRawValue').mockReturnValue({
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
    vi.spyOn(component, 'dispatchExportDmp');
    vi.spyOn(component, 'exportDmpTemplate');

    vi.spyOn(component.dmpForm.controls.project, 'getRawValue').mockReturnValue({
      funderSupported: false,
    });

    const dialogRefMock = {
      componentInstance: { funderSupported: false },
      beforeClosed: () => of('show popup'),
      afterClosed: () => of(null),
      close: () => {},
    };

    vi.spyOn((component as any).dialog, 'open').mockReturnValue(dialogRefMock);

    component.exportDmpTemplate();

    await fixture.whenStable();

    expect(component.dispatchExportDmp).not.toHaveBeenCalled();
    expect((component as any).dialog.open).toHaveBeenCalled();
    expect(component.dmpForm.controls.project.getRawValue).toHaveBeenCalled();
  }));
});
