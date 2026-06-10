import { DmpState } from './dmp.state';
import { RepositoryState } from './repository.state';
import { FormState } from './form.state';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  form: FormState;
  dmps: DmpState;
  repositories: RepositoryState;
}

export const selectDamapState = createFeatureSelector<AppState>('damap');
