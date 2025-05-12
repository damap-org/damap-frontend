import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Consent } from '@damap/core';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: [],
  standalone: false,
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
