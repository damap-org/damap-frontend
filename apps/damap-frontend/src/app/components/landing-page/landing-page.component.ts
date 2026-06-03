import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IMAGE_KEYS } from '../../../../../../libs/damap/src/lib/domain/image-keys';
import { ConfigService } from '../../services/config.service';
import { map, Observable } from 'rxjs';
import { ImageThemeService } from '../../services/image-theme.service';

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
  logoUrl: SafeUrl;
  backgroundUrl: string;
  graphicUrl: SafeUrl;

  constructor(
    private translate: TranslateService,
    private imageThemeService: ImageThemeService,
    private configService: ConfigService,
  ) {
    this.backgroundUrl = this.imageThemeService.getImageUrl(
      IMAGE_KEYS.LANDING_PAGE_BACKGROUND,
    );

    this.logoUrl = this.imageThemeService.getImage(
      IMAGE_KEYS.LANDING_PAGE_LOGO,
    );

    this.graphicUrl = this.imageThemeService.getImage(
      IMAGE_KEYS.LANDING_PAGE_GRAPHIC,
    );
  }

  ngOnInit(): void {
    // TODO: The fallback doesnt work when english has been deactivated
    const preferredLang =
      localStorage.getItem('lang') || this.translate.getBrowserLang() || 'en';
    this.translate.getTranslation(preferredLang).subscribe(translations => {
      const languageToUse =
        translations && Object.keys(translations).length > 0
          ? preferredLang
          : 'en';

      this.translate.use(languageToUse);
      localStorage.setItem('lang', languageToUse);
    });

    this.backendDown$ = this.configService.isBackendDown();
  }
}
