import { Config } from '@damap/core';
import {
  THEME_IMAGE_DEFINITIONS,
  IMAGE_KEYS,
} from '../../../../../libs/damap/src/lib/domain/image-keys';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Injectable, inject, SecurityContext } from '@angular/core';

export interface ThemeImage {
  key: string;
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageThemeService {
  private readonly sanitizer = inject(DomSanitizer);
  private images: { [key: string]: SafeUrl } = {};

  constructor() {
    this.resetToDefaults();
  }

  public applyTheming(config: Config): void {
    this.resetToDefaults();
    if (!config.images || config.images.length === 0) {
      return;
    }

    for (const image of config.images) {
      if (image.data) {
        const url = `data:${image.mimeType};base64,${image.data}`;
        this.images[image.imageKey] =
          this.sanitizer.bypassSecurityTrustUrl(url);
      }
    }

    this.updateFavicon();
  }

  public resetToDefaults(): void {
    const defaultImages: { [key: string]: SafeUrl } = {};
    for (const image of THEME_IMAGE_DEFINITIONS) {
      defaultImages[image.key] = this.sanitizer.bypassSecurityTrustUrl(
        image.defaultUrl,
      );
    }
    this.images = defaultImages;
    this.updateFavicon();
  }

  public getImage(key: string): SafeUrl {
    return this.images[key] || this.sanitizer.bypassSecurityTrustUrl('');
  }

  /**
   * Gets a raw URL string for CSS background images
   * @param key The image key identifier
   * @returns Raw URL string
   */
  public getImageUrl(key: string): string {
    const safeUrl = this.images[key];
    if (safeUrl) {
      return this.sanitizer.sanitize(SecurityContext.URL, safeUrl) || '';
    }
    return '';
  }

  private updateFavicon(): void {
    const safeUrl = this.images[IMAGE_KEYS.FAVICON];
    if (safeUrl) {
      const faviconUrl = this.sanitizer.sanitize(SecurityContext.URL, safeUrl);
      if (faviconUrl) {
        let faviconLink = document.querySelector(
          'link[rel="icon"]',
        ) as HTMLLinkElement;
        if (!faviconLink) {
          faviconLink = document.createElement('link');
          faviconLink.rel = 'icon';
          document.head.appendChild(faviconLink);
        }
        faviconLink.href = faviconUrl;
      }
    }
  }
}
