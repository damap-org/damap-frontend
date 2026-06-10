import {
  createDmp,
  dmpsLoaded,
  exportDmpTemplate,
  failedToLoadDmps,
  loadDmps,
} from '../actions/dmp.actions';
import { of, throwError } from 'rxjs';

import { BackendService } from '../../services/backend.service';
import { DmpEffects } from './dmp.effects';
import { FormService } from '../../services/form.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { TestBed } from '@angular/core/testing';
import { completeDmp } from '../../mocks/dmp-mocks';
import { mockDmpList } from '../../mocks/dmp-list-mocks';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FeedbackTestingModule } from '../../testing/services-testing/feedback-testing';

describe('DmpEffects', () => {
  let actions$;
  let effects;
  let backendService;
  let formService;
  let initialState = {
    damap: {
      dmps: { dmps: [], loaded: LoadingState.LOADED },
      form: { dmp: undefined, changed: false },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackTestingModule],
      providers: [
        DmpEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: BackendService,
          useValue: jasmine.createSpyObj('BackendService', [
            'getDmps',
            'createDmp',
            'editDmp',
            'saveDmpVersion',
            'exportDmpTemplate',
            'getDmpDocument',
          ]),
        },
        {
          provide: FormService,
          useValue: jasmine.createSpyObj('FormService', ['mapDmpToForm']),
        },
      ],
    });
    effects = TestBed.inject<DmpEffects>(DmpEffects);
    backendService = TestBed.inject<BackendService>(BackendService);
    formService = TestBed.inject<FormService>(FormService);
  });

  it('should load and return dmps', () => {
    actions$ = of(loadDmps(false));
    backendService.getDmps.and.returnValue(of(mockDmpList));

    effects.loadDmps$.subscribe((action: any) => {
      expect(backendService.getDmps).toHaveBeenCalledTimes(1);
      expect(action).toEqual(dmpsLoaded({ dmps: mockDmpList }));
    });
  });

  it('should not load dmps', () => {
    actions$ = of(loadDmps());

    effects.loadDmps$.subscribe({
      complete: () => expect(backendService.getDmps).toHaveBeenCalledTimes(0),
    });
  });

  it('should load dmps and fail', () => {
    actions$ = of(loadDmps(false));
    backendService.getDmps.and.returnValue(
      throwError(() => new HttpErrorResponse({})),
    );

    effects.loadDmps$.subscribe((action: any) => {
      expect(backendService.getDmps).toHaveBeenCalledTimes(1);
      expect(action).toEqual(failedToLoadDmps());
    });
  });

  it('should create dmp', () => {
    actions$ = of(createDmp({ dmp: completeDmp }));
    backendService.createDmp.and.returnValue(of(completeDmp));
    const storeSpy = spyOn(effects.store$, 'dispatch').and.callThrough();

    effects.createDmp$.subscribe({
      next: (action: any) => {
        expect(action).toEqual(loadDmps(false));
      },
      complete: () => {
        expect(backendService.createDmp).toHaveBeenCalledOnceWith(completeDmp);
        expect(formService.mapDmpToForm).toHaveBeenCalledTimes(1);
        expect(storeSpy).toHaveBeenCalledTimes(2);
      },
    });
  });

  it('should save and export dmp', () => {
    actions$ = of(
      exportDmpTemplate({
        dmp: completeDmp,
        dmpTemplateType: 1,
      }),
    );
    backendService.editDmp.and.returnValue(of(completeDmp));

    effects.exportDmpTemplate$.subscribe({
      complete: () => {
        expect(backendService.editDmp).toHaveBeenCalledTimes(0);
        expect(formService.mapDmpToForm).toHaveBeenCalledTimes(0);
      },
    });
  });

  it('should export dmp without saving', () => {
    effects.store$.setState({
      damap: {
        dmps: { dmps: [], loaded: LoadingState.LOADED },
        form: { changed: true },
      },
    });

    actions$ = of(
      exportDmpTemplate({
        dmp: completeDmp,
        dmpTemplateType: 1,
      }),
    );
    backendService.editDmp.and.returnValue(of(completeDmp));
    const storeSpy = spyOn(effects.store$, 'dispatch').and.callThrough();

    effects.exportDmpTemplate$.subscribe({
      complete: () => {
        expect(backendService.editDmp).toHaveBeenCalledTimes(1);
        expect(formService.mapDmpToForm).toHaveBeenCalledOnceWith(completeDmp);
        expect(storeSpy).toHaveBeenCalledTimes(2);
      },
    });
  });

  it('should fail to save and export dmp', () => {
    effects.store$.setState({
      damap: {
        dmps: { dmps: [], loaded: LoadingState.LOADED },
        form: { changed: true },
      },
    });

    actions$ = of(
      exportDmpTemplate({
        dmp: completeDmp,
        dmpTemplateType: 1,
      }),
    );
    backendService.editDmp.and.returnValue(
      throwError(() => new HttpErrorResponse({})),
    );
    const storeSpy = spyOn(effects.store$, 'dispatch').and.callThrough();

    effects.exportDmpTemplate$.subscribe({
      complete: () => {
        expect(backendService.editDmp).toHaveBeenCalledTimes(1);
        expect(formService.mapDmpToForm).toHaveBeenCalledTimes(0);
        expect(storeSpy).toHaveBeenCalledTimes(0);
      },
    });
  });
});
