import {
  computed,
  inject,
  Injectable,
  ResourceStatus,
  signal,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { DmpApi } from './dmp.api';
import { Dmp } from '../domain/dmp';
import { DmpListItem } from '../domain/dmp-list-item';
import { LoadingState } from '../domain/enum/loading-state.enum';
import { FeedbackService } from '../services/feedback.service';
import { FormService } from '../services/form.service';

@Injectable({ providedIn: 'root' })
export class DmpStore {
  private readonly api = inject(DmpApi);
  private readonly formService = inject(FormService);
  private readonly feedbackService = inject(FeedbackService);

  private readonly dmpsLoadRequested = signal(false);
  private readonly savingDmpState = signal(false);

  private readonly dmpsResource = httpResource<DmpListItem[]>(
    () => (this.dmpsLoadRequested() ? this.api.dmps : undefined),
    { defaultValue: [] },
  );

  readonly dmps = computed(() => this.dmpsResource.value());
  readonly dmpsLoaded = computed(() =>
    this.toLoadingState(this.dmpsResource.status()),
  );
  readonly savingDmp = this.savingDmpState.asReadonly();

  dmpById(id: number): DmpListItem | undefined {
    return this.dmps().find(dmp => dmp.id === id);
  }

  loadDmps(skipIfPresent: boolean = true): void {
    if (skipIfPresent && this.dmpsLoaded() === LoadingState.LOADED) {
      return;
    }

    if (!this.dmpsLoadRequested()) {
      this.dmpsLoadRequested.set(true);
      return;
    }

    this.dmpsResource.reload();
  }

  removeDmp(id: number): void {
    this.dmpsResource.update(dmps => dmps.filter(dmp => dmp.id !== id));
  }

  createDmp(dmp: Dmp): Observable<Dmp> {
    this.savingDmpState.set(true);
    return this.api.createDmp(dmp).pipe(
      tap(savedDmp => {
        this.formService.mapDmpToForm(savedDmp);
        this.feedbackService.success('dmp.success.save');
        this.loadDmps(false);
      }),
      catchError((error: Error) => {
        this.feedbackService.error('dmp.save.error', error);
        return EMPTY;
      }),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  updateDmp(dmp: Dmp): Observable<Dmp> {
    this.savingDmpState.set(true);
    return this.api.updateDmp(dmp).pipe(
      tap(savedDmp => {
        this.formService.mapDmpToForm(savedDmp);
        this.feedbackService.success('dmp.success.update');
      }),
      catchError((error: Error) => {
        this.feedbackService.error('dmp.save.error', error);
        return EMPTY;
      }),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  saveDmpVersion(dmp: Dmp, versionName: string): Observable<Dmp> {
    this.savingDmpState.set(true);
    const saveDmp$ = dmp.id ? this.api.updateDmp(dmp) : this.api.createDmp(dmp);

    return saveDmp$.pipe(
      switchMap(savedDmp => {
        const version = {
          id: undefined,
          revisionNumber: undefined,
          versionDate: undefined,
          versionName,
          dmpId: savedDmp.id,
          editor: undefined,
        };

        return this.api.saveDmpVersion(version).pipe(map(() => savedDmp));
      }),
      tap(savedDmp => {
        this.formService.mapDmpToForm(savedDmp);
        this.feedbackService.success('dmp.success.version.save');
        this.loadDmps(true);
      }),
      catchError((error: Error) => {
        this.feedbackService.error('dmp.save.error', error);
        return EMPTY;
      }),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  exportDmp(
    dmp: Dmp,
    changed: boolean | undefined,
    templateType?: number,
  ): Observable<Dmp | null> {
    const exportSavedDmp = (savedDmp: Dmp): void => {
      const export$ =
        templateType !== undefined
          ? this.api.exportDmpTemplate(savedDmp.id, templateType)
          : this.api.exportDmp(savedDmp.id);

      export$
        .pipe(
          catchError((error: Error) => {
            this.feedbackService.error('http.error.document', error);
            return EMPTY;
          }),
        )
        .subscribe();
    };

    if (changed !== false) {
      this.savingDmpState.set(true);
      const saveDmp$ = dmp.id
        ? this.api.updateDmp(dmp)
        : this.api.createDmp(dmp);

      return saveDmp$.pipe(
        tap(savedDmp => {
          this.formService.mapDmpToForm(savedDmp);
          exportSavedDmp(savedDmp);
        }),
        catchError((error: Error) => {
          this.feedbackService.error('dmp.save.error', error);
          return EMPTY;
        }),
        finalize(() => this.savingDmpState.set(false)),
      );
    }

    exportSavedDmp(dmp);
    return of(null);
  }

  private toLoadingState(status: ResourceStatus): LoadingState {
    switch (status) {
      case ResourceStatus.Error:
        return LoadingState.FAILED;
      case ResourceStatus.Loading:
      case ResourceStatus.Reloading:
        return LoadingState.LOADING;
      case ResourceStatus.Resolved:
      case ResourceStatus.Local:
        return LoadingState.LOADED;
      case ResourceStatus.Idle:
        return LoadingState.NOT_LOADED;
      default:
        return LoadingState.NOT_LOADED;
    }
  }
}
