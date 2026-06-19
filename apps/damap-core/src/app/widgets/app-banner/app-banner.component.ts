import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Banner } from '../../domain/banner';
import { BackendService } from '../../services/backend.service';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-banner',
  templateUrl: './app-banner.component.html',
  styleUrls: ['./app-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatIcon, MatCardContent],
})
export class AppBannerComponent implements OnInit {
  private backendService = inject(BackendService);

  banner: Banner | undefined;

  bannerVisible = false;

  dismissBanner() {
    this.bannerVisible = false;
  }

  ngOnInit(): void {
    this.backendService.getAppBanner().subscribe(banner => {
      if (banner) {
        this.banner = banner;
        this.bannerVisible = true;
      }
    });
  }
}
