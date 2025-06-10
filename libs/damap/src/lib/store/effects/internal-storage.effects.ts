import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend.service';
import * as InternalStorageAction from '../actions/internal-storage.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class InternalStorageEffects {
  loadInternalStorages$;

  constructor(
    private actions$: Actions,
    private backendService: BackendService,
  ) {
    this.loadInternalStorages$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InternalStorageAction.loadInternalStorages),
        switchMap(_ =>
          this.backendService.searchInternalStorage({}).pipe(
            map(internalStorages => {
              // We now get at least any language translation, so we can display the title
              const items = internalStorages.items;
              return InternalStorageAction.internalStoragesLoaded({
                internalStorages: items,
              });
            }),
            catchError(() =>
              of(InternalStorageAction.failedToLoadInternalStorages()),
            ),
          ),
        ),
      ),
    );
  }
}
