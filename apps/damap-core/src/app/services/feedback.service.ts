import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  protected _snackBar = inject(MatSnackBar);
  protected translate = inject(TranslateService);
  protected loggerService = inject(LoggerService);

  error(message: string, error?: Error, timeInMs: number = 20000) {
    this.translate.get(message).subscribe((translation) =>
      this._snackBar.open(translation, 'x', {
        duration: timeInMs,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snack-error',
      }),
    );

    if (error) {
      this.loggerService.error(error);
    }
  }

  success(message: string) {
    this.translate.get(message).subscribe((translation) =>
      this._snackBar.open(translation, 'x', {
        duration: 4500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snack-success',
      }),
    );
  }
}
