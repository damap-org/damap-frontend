import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService, BackendService } from '@damap/core';
import { environment } from '../../../../../apps/damap-frontend/src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private backendService: BackendService,
  ) {}

  private isRefreshing = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('damap_session_token');

    if (!token || !request.url.startsWith(environment.backendurl)) {
      return next.handle(request);
    }

    if (this.authService.isExpiredToken() && !this.isRefreshing) {
      console.log('Token expired, attempting proactive refresh...');
      this.isRefreshing = true;

      return this.backendService.refreshJWT(token).pipe(
        switchMap(response => {
          this.isRefreshing = false;
          const newToken = response.token;
          localStorage.setItem('damap_session_token', newToken);
          console.log('Proactive refresh successful.');

          const newRequest = this.addTokenHeader(request, newToken);
          return next.handle(newRequest);
        }),
        catchError(error => {
          this.isRefreshing = false;
          console.error('Proactive refresh failed. Logging out.', error);
          this.authService.logout();
          return throwError(() => error);
        }),
      );
    } else {
      const authorizedRequest = this.addTokenHeader(request, token);
      return next.handle(authorizedRequest);
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
