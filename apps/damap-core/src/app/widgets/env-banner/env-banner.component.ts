import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-env-banner',
  templateUrl: './env-banner.component.html',
  styleUrls: ['./env-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    TranslatePipe,
    TranslateDirective,
  ],
})
export class EnvBannerComponent {}
