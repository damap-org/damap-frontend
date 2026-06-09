import { LoadingState } from '../../domain/enum/loading-state.enum';
import { InternalStorage } from '../../domain/internal-storage';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface InternalStorageState extends EntityState<InternalStorage> {
  loaded: LoadingState;
}

export const adapter: EntityAdapter<InternalStorage> =
  createEntityAdapter<InternalStorage>();

export const initialInternalStorageState: InternalStorageState =
  adapter.getInitialState({
    loaded: LoadingState.NOT_LOADED,
  });
