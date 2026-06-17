import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
    TranslatePipe,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class LandingPageComponent implements OnInit {
  private translate = inject(TranslateService);
  private imageThemeService = inject(ImageThemeService);
  private configService = inject(ConfigService);

  public backendDown$: Observable<boolean>;
  logoUrl: SafeUrl;
  backgroundUrl: string;
  graphicUrl: SafeUrl;

  constructor() {
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
    this.translate.reloadLang(preferredLang).subscribe(translations => {
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
