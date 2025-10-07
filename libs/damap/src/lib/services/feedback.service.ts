import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    protected _snackBar: MatSnackBar,
    protected translate: TranslateService,
    protected loggerService: LoggerService,
  ) {}

  error(message: string, error?: Error, timeInMs: number = 4500) {
    this.translate.get(message).subscribe(translation =>
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
    this.translate.get(message).subscribe(translation =>
      this._snackBar.open(translation, 'x', {
        duration: 4500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snack-success',
      }),
    );
  }
}
