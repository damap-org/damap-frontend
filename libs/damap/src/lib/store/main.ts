import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './states/app.state';
import { dmpReducer } from './reducers/dmp.reducer';
import { formReducer } from './reducers/form.reducer';

export const reducers: ActionReducerMap<AppState> = {
  form: formReducer,
  dmps: dmpReducer,
};

export const config = {
  metaReducers: [],
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  },
};
