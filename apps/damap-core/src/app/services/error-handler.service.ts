import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeedbackService } from './feedback.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private readonly translate = inject(TranslateService);
  private readonly feedbackService = inject(FeedbackService);

  handleError(message = 'http.error.standard') {
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

      // Error handling in the backend is not consistent yet
      // Currently, all endpoints that talk with external API's return custom error codes
      // All other endpoints are using the http codes
      let errorPayload = error.error;
      if (errorPayload.errorCode) {
        // means we are using the new system
        message = this.translate.instant('http.error.errorCodes.' + errorPayload.errorCode);
        console.log(error);
        console.log(
          'An error occured: ' +
            errorPayload.details +
            '\nCustom error code: ' +
            errorPayload.errorCode,
        );
      } else {
        console.log(error);
      }
      this.feedbackService.error(message);
      throw new HttpErrorResponse({ statusText: message });
    };
  }
}
