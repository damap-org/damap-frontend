import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FeedbackService } from '../services/feedback.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private oAuthService: OAuthService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = this.oAuthService.getAccessToken();
    if (accessToken == null) {
      return next.handle(req);
    }

    const date = new Date(this.oAuthService.getAccessTokenExpiration());
    const timeLeft = date.getTime() - new Date().getTime();

    if (timeLeft < 5 * 1000) {
      return from(this.oAuthService.refreshToken()).pipe(
        switchMap(() => {
          const refreshedToken = this.oAuthService.getAccessToken();
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${refreshedToken}` },
          });
          return next.handle(cloned);
        }),
        catchError(() => {
          alert('Your session has expired. Please log in again.');
          this.authService.logoutAndLogin(window.location.href);
          return new Observable<HttpEvent<any>>();
        }),
      );
    }

    return next.handle(req);
  }
}
