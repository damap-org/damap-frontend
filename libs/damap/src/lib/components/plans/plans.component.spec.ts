import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

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
  let store: MockStore;
  const initialState = {
    damap: { dmps: { loaded: true, entities: mockDmpList, ids: [1] } },
  };

  beforeEach(waitForAsync(
    waitForAsync(() => {
      backendSpy = jasmine.createSpyObj('BackendService', [
        'getDmpDocument',
        'getMaDmpJsonFile',
        'getDmpById',
        'getAllDmps',
        'deleteDmp',
        'exportDmpTemplate',
      ]);
      backendSpy.getAllDmps.and.returnValue(of(mockDmpList));
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
        ],
        declarations: [PlansComponent],
        providers: [
          provideMockStore({ initialState }),
          { provide: BackendService, useValue: backendSpy },
          { provide: AuthService, useValue: authSpy },
          UntypedFormBuilder,
          FormService,
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(PlansComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(MockStore);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    }),
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove dmps', waitForAsync(async () => {
    spyOn(store, 'dispatch');
    authSpy.isAdmin.and.returnValue(true);
    backendSpy.deleteDmp.and.returnValue(of({ status: 204 }));

    component.deleteDmp(1);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);

    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    await buttons[1].click();

    expect(backendSpy.deleteDmp).toHaveBeenCalledWith(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
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
    expect(backendSpy.exportDmpTemplate).toHaveBeenCalledWith(
      id,
      'some_template',
    );
  }));
});
