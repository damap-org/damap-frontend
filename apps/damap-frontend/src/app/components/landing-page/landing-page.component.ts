import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-landing-page',
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
  standalone: true,
})
export class LandingPageComponent implements OnInit {
  public backendDown$: Observable<boolean>;

  constructor(
    private translate: TranslateService,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
    this.backendDown$ = this.configService.isBackendDown();
  }
}
