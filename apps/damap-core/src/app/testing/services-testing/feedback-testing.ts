import { Overlay } from '@angular/cdk/overlay';
import { Injectable, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from '../../services/feedback.service';
import { TranslateTestingModule } from '../translate-testing/translate-testing.module';

@Injectable({
  providedIn: 'root',
})
class FeedbackServiceStub extends FeedbackService {
  override error(message: string, error?: Error): void {
    // Can be customized further.
    this.loggerService.error(message);
    if (error) {
      this.loggerService.error(error);
    }
  }
  override success(message: string): void {
    // Can be customized further.
    this.loggerService.info(message);
  }
}

@NgModule({
  imports: [TranslateTestingModule],
  providers: [
    MatSnackBar,
    Overlay,
    { provide: FeedbackService, useClass: FeedbackServiceStub },
  ],
})
class FeedbackTestingModule {}

export { FeedbackServiceStub, FeedbackTestingModule };
