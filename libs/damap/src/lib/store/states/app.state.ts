import { DmpState } from './dmp.state';
import { FormState } from './form.state';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  form: FormState;
  dmps: DmpState;
}

export const selectDamapState = createFeatureSelector<AppState>('damap');
