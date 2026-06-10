import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './states/app.state';
import { dmpReducer } from './reducers/dmp.reducer';
import { repositoryReducer } from './reducers/repository.reducer';
import { formReducer } from './reducers/form.reducer';
import { internalStorageReducer } from './reducers/internal-storage.reducer';

export const reducers: ActionReducerMap<AppState> = {
  form: formReducer,
  dmps: dmpReducer,
  repositories: repositoryReducer,
  internalStorages: internalStorageReducer,
};

export const config = {
  metaReducers: [],
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  },
};
