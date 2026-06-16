import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, retry, tap } from 'rxjs';

import { APP_ENV } from '../constants';
import { Dmp } from '../domain/dmp';
import { Version } from '../domain/version';

type DmpVersionDraft = Omit<
  Version,
  'id' | 'revisionNumber' | 'versionDate' | 'editor'
> &
  Partial<Pick<Version, 'id' | 'revisionNumber' | 'versionDate' | 'editor'>>;

@Injectable({ providedIn: 'root' })
export class DmpApi {
  private readonly http = inject(HttpClient);

  private readonly backendUrl = APP_ENV.backendurl;
  private readonly dmpUrl = `${this.backendUrl}dmps`;
  private readonly versionUrl = `${this.backendUrl}versions`;

  readonly dmps = `${this.dmpUrl}/list`;

  createDmp(dmp: Dmp): Observable<Dmp> {
    return this.http
      .post<Dmp>(this.dmpUrl, dmp, this.jsonOptions)
      .pipe(retry(3));
  }

  updateDmp(dmp: Dmp): Observable<Dmp> {
    return this.http
      .put<Dmp>(`${this.dmpUrl}/${dmp.id}`, dmp, this.jsonOptions)
      .pipe(retry(3));
  }

  saveDmpVersion(version: DmpVersionDraft): Observable<Version> {
    return this.http
      .put<Version>(this.versionUrl, version, this.jsonOptions)
      .pipe(retry(3));
  }

  exportDmpTemplate(dmpId: number, template: number): Observable<void> {
    return this.http
      .get(`${this.backendUrl}document/${dmpId}/export?template=${template}`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(this.downloadResponse());
  }

  exportDmp(dmpId: number): Observable<void> {
    return this.http
      .get(`${this.backendUrl}document/${dmpId}/export`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(this.downloadResponse());
  }

  private get jsonOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private downloadResponse() {
    return (source: Observable<HttpResponse<Blob>>) =>
      source.pipe(
        tap(response => this.downloadFile(response)),
        map(() => undefined),
      );
  }

  private downloadFile(response: HttpResponse<Blob>): void {
    const contentDisposition = response.headers.get('content-disposition');
    const filename = contentDisposition
      ? contentDisposition.substring(
          contentDisposition.lastIndexOf('filename=') + 9,
        )
      : 'damap-export';
    const url = URL || webkitURL;
    const anchor = document.createElement('a');

    anchor.href = url.createObjectURL(response.body);
    anchor.download = filename;
    anchor.click();
    url.revokeObjectURL(anchor.href);
  }
}
