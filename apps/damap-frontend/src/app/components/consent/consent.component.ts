import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class ConsentComponent {
  public lang = 'EN';
  public consent: Consent;

  constructor(private translate: TranslateService) {}

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }
}
