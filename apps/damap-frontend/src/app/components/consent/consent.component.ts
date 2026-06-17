import { Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Consent } from '@damap/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: [],
  imports: [
    CdkScrollable,
    MatDialogContent,
    TranslatePipe, TranslateDirective,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class ConsentComponent {
  private translate = inject(TranslateService);

  public lang = 'EN';
  public consent: Consent;

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }
}
