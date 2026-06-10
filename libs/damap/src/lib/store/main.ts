import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './states/app.state';
import { dmpReducer } from './reducers/dmp.reducer';
import { repositoryReducer } from './reducers/repository.reducer';
import { formReducer } from './reducers/form.reducer';

export const reducers: ActionReducerMap<AppState> = {
  form: formReducer,
  dmps: dmpReducer,
  repositories: repositoryReducer,
};

export const config = {
  metaReducers: [],
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  },
};
