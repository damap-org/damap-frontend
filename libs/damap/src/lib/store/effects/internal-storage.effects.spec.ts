import { TestBed } from '@angular/core/testing';
import { InternalStorageEffects } from './internal-storage.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { BackendService } from '../../services/backend.service';
import { of, throwError } from 'rxjs';
import * as InternalStorageAction from '../actions/internal-storage.actions';
import {
  mockInternalStorage,
  mockInternalStorageSearchResult,
} from '../../mocks/storage-mocks';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions } from '@ngrx/effects';

describe('InternalStorageEffects', () => {
  let actions$: Actions;
  let effects: InternalStorageEffects;
  let backendService: jasmine.SpyObj<BackendService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternalStorageEffects,
        provideMockActions(() => actions$),
        {
          provide: BackendService,
          useValue: jasmine.createSpyObj('BackendService', [
            'searchInternalStorage',
          ]),
        },
      ],
    });
    effects = TestBed.inject<InternalStorageEffects>(InternalStorageEffects);
    backendService = TestBed.inject<BackendService>(
      BackendService,
    ) as jasmine.SpyObj<BackendService>;
  });

  it('should load and return internal storages', () => {
    actions$ = of(InternalStorageAction.loadInternalStorages());
    backendService.searchInternalStorage.and.returnValue(
      of(mockInternalStorageSearchResult), // Mock the response
    );

    effects.loadInternalStorages$.subscribe(action => {
      expect(backendService.searchInternalStorage).toHaveBeenCalled();
      expect(action).toEqual(
        InternalStorageAction.internalStoragesLoaded({
          internalStorages: [mockInternalStorage],
        }),
      );
    });
  });

  it('should handle failure when loading internal storages', () => {
    actions$ = of(InternalStorageAction.loadInternalStorages());
    backendService.searchInternalStorage.and.returnValue(
      throwError(() => new HttpErrorResponse({})),
    );

    effects.loadInternalStorages$.subscribe(action => {
      expect(backendService.searchInternalStorage).toHaveBeenCalled();
      expect(action).toEqual(
        InternalStorageAction.failedToLoadInternalStorages(),
      );
    });
  });
});
