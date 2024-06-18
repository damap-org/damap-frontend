import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatAnchor,
    MatIcon,
    TranslateModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
  }
}
