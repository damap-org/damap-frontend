import { computed, effect, inject, Injectable, type ResourceStatus, signal } from '@angular/core';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { catchError, EMPTY, finalize, map, Observable, of, switchMap, tap } from 'rxjs';

import { DmpApi } from './dmp.api';
import { Dmp } from '../domain/dmp';
import { DmpListItem } from '../domain/dmp-list-item';
import { LoadingState } from '../domain/enum/loading-state.enum';
import { FeedbackService } from '../services/feedback.service';
import { FormService } from '../services/form.service';
import { ErrorHandlerService } from '@damap-frontend-core/app/services/error-handler.service';

@Injectable({ providedIn: 'root' })
export class DmpStore {
  private readonly api = inject(DmpApi);
  private readonly formService = inject(FormService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  private readonly dmpsLoadRequested = signal(false);
  private readonly savingDmpState = signal(false);

  private readonly dmpsResource = httpResource<DmpListItem[]>(
    () => (this.dmpsLoadRequested() ? this.api.dmps : undefined),
    { defaultValue: [] },
  );

  readonly dmps = computed(() => this.dmpsResource.value());
  readonly dmpsLoaded = computed(() => this.toLoadingState(this.dmpsResource.status()));
  readonly savingDmp = this.savingDmpState.asReadonly();

  private readonly errorEffect = effect(() => {
    const error = this.dmpsResource.error() as HttpErrorResponse;

    if (error) {
      this.errorHandlerService.handleError()(error);
    }
  });

  dmpById(id: number): DmpListItem | undefined {
    return this.dmps().find((dmp) => dmp.id === id);
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
    this.dmpsResource.update((dmps) => dmps.filter((dmp) => dmp.id !== id));
  }

  createDmp(dmp: Dmp): Observable<Dmp> {
    this.savingDmpState.set(true);
    return this.api.createDmp(dmp).pipe(
      tap((savedDmp) => {
        this.formService.mapDmpToForm(savedDmp);
        this.feedbackService.success('dmp.success.save');
        this.loadDmps(false);
      }),
      catchError(this.errorHandlerService.handleError('http.error.plans.save')),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  updateDmp(dmp: Dmp): Observable<Dmp> {
    this.savingDmpState.set(true);
    return this.api.updateDmp(dmp).pipe(
      tap((savedDmp) => {
        this.formService.mapDmpToForm(savedDmp);
        this.feedbackService.success('dmp.success.update');
      }),
      catchError(this.errorHandlerService.handleError('http.error.plans.update')),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  saveDmpVersion(dmp: Dmp, versionName: string): Observable<Dmp> {
    this.savingDmpState.set(true);
    const saveDmp$ = dmp.id ? this.api.updateDmp(dmp) : this.api.createDmp(dmp);

    return saveDmp$.pipe(
      switchMap((savedDmp) => {
        const version = {
          id: undefined,
          revisionNumber: undefined,
          versionDate: undefined,
          versionName,
          dmpId: this.requireDmpId(savedDmp),
          editor: undefined,
        };

        return this.api.saveDmpVersion(version).pipe(map(() => savedDmp));
      }),
      tap((savedDmp) => {
        this.formService.mapDmpToForm(savedDmp);
        this.feedbackService.success('dmp.success.version.save');
        this.loadDmps(true);
      }),
      catchError(this.errorHandlerService.handleError('http.error.versions.save')),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  exportDmp(dmp: Dmp, templateType?: number): Observable<Dmp | null> {
    const exportSavedDmp = (savedDmp: Dmp): void => {
      const dmpId = this.requireDmpId(savedDmp);
      const export$ =
        templateType !== undefined
          ? this.api.exportDmpTemplate(dmpId, templateType)
          : this.api.exportDmp(dmpId);

      export$
        .pipe(catchError(this.errorHandlerService.handleError('http.error.document')))
        .subscribe();
    };

    this.savingDmpState.set(true);
    const saveDmp$ = dmp.id ? this.api.updateDmp(dmp) : this.api.createDmp(dmp);

    return saveDmp$.pipe(
      tap((savedDmp) => {
        this.formService.mapDmpToForm(savedDmp);
        exportSavedDmp(savedDmp);
      }),
      catchError(this.errorHandlerService.handleError('dmp.save.error')),
      finalize(() => this.savingDmpState.set(false)),
    );
  }

  private requireDmpId(dmp: Dmp): number {
    if (dmp.id == null) {
      throw new Error('A persisted DMP id is required for this operation.');
    }

    return dmp.id;
  }

  private toLoadingState(status: ResourceStatus): LoadingState {
    switch (status) {
      case 'error':
        return LoadingState.FAILED;
      case 'loading':
      case 'reloading':
        return LoadingState.LOADING;
      case 'resolved':
      case 'local':
        return LoadingState.LOADED;
      case 'idle':
        return LoadingState.NOT_LOADED;
      default:
        return LoadingState.NOT_LOADED;
    }
  }
}
