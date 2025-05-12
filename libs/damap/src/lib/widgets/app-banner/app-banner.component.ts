import { Component, OnInit } from '@angular/core';
import { Banner } from '../../domain/banner';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-banner',
  templateUrl: './app-banner.component.html',
  styleUrls: ['./app-banner.component.css'],
  standalone: false,
})
export class AppBannerComponent implements OnInit {
  constructor(private backendService: BackendService) {}

  banner: Banner = {
    title: 'Default Title',
    description: 'Default Description',
    dismissible: true,
    color: '#ffffff',
  };

  bannerVisible = true;

  dismissBanner() {
    this.bannerVisible = false;
  }

  ngOnInit(): void {
    this.backendService.getAppBanner().subscribe(banner => {
      if (!banner) {
        this.bannerVisible = false;
      }
      this.banner = banner;
    });
  }
}
