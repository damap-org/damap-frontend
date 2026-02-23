import { createAction, props } from '@ngrx/store';

import { Dmp } from '../../domain/dmp';
import { DmpListItem } from '../../domain/dmp-list-item';
import { ETemplateType } from '../../domain/enum/export-template-type.enum';

export const loadDmps = createAction(
  '[Dmps] Load all',
  (skipIfPresent: boolean = true) => ({ skipIfPresent }),
);

export const dmpsLoaded = createAction(
  '[Dmps] All loaded',
  props<{ dmps: DmpListItem[] }>(),
);

export const failedToLoadDmps = createAction('[Dmps] Failed to load all');

export const createDmp = createAction(
  '[Dmps] Create new dmp',
  props<{ dmp: Dmp }>(),
);

export const updateDmp = createAction(
  '[Dmps] Update dmp',
  props<{ dmp: Dmp }>(),
);

export const saveDmpVersion = createAction(
  '[Dmps] Save new version',
  props<{ dmp: Dmp; versionName: string }>(),
);

export const dmpSaved = createAction('[Dmps] Dmp saved');

export const failedToSaveDmp = createAction('[Dmps] Failed to save dmp');

export const dmpExported = createAction('[Dmps] Dmp exported');

export const deleteDmp = createAction(
  '[Dmps] Remove dmp',
  props<{ id: number }>(),
);

export const exportDmp = createAction(
  '[Dmps] Export dmp',
  props<{ dmp: Dmp }>(),
);

export const exportDmpTemplate = createAction(
  '[Dmps] Export dmp with template',
  props<{ dmp: Dmp; dmpTemplateType: number }>(),
);
