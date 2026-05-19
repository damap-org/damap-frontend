import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { APP_ENV } from '../constants';
import { Benchmark } from '../domain/benchmark';
import { EvaluationResult } from '../domain/evaluation-result';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private readonly baseUrl = APP_ENV.backendurl + 'evaluation';

  constructor(
    private http: HttpClient,
    private feedbackService: FeedbackService,
    private translate: TranslateService,
  ) {}

  getBenchmarks(): Observable<Benchmark[]> {
    return this.http
      .get<Benchmark[]>(`${this.baseUrl}/benchmarks`)
      .pipe(
        retry(3),
        catchError(this.handleError('http.error.evaluation.benchmarks.load')),
      );
  }

  runEvaluation(
    dmpId: number,
    benchmarkId: string,
  ): Observable<EvaluationResult[]> {
    return this.http
      .post<
        EvaluationResult[]
      >(`${this.baseUrl}/assess/${dmpId}`, null, { params: new HttpParams().set('benchmark', benchmarkId) })
      .pipe(catchError(this.handleError('http.error.evaluation.assess')));
  }

  private handleError(message = 'http.error.standard') {
    message = this.translate.instant(message);
    return async (error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.translate.instant('http.error.0');
      } else if (error.status === 404) {
        message += this.translate.instant('http.error.404');
      } else if (error.status === 500) {
        message += this.translate.instant('http.error.500');
      } else if (error.status === 503) {
        message += this.translate.instant('http.error.503');
      }
      console.log(error);
      this.feedbackService.error(message);
      throw new HttpErrorResponse({ statusText: message });
    };
  }
}
