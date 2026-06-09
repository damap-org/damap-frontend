import { Component, inject, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ImageThemeService } from 'apps/damap-frontend/src/app/services/image-theme.service';
import { IMAGE_KEYS } from '../../domain/image-keys';

@Component({
    selector: 'app-orcid',
    templateUrl: './orcid.component.html',
    styleUrls: ['./orcid.component.css'],
})
export class OrcidComponent implements OnInit {
  private readonly imageThemeService = inject(ImageThemeService);
  @Input() orcidId: string;

  logoUrl: SafeUrl;

  ngOnInit() {
    this.logoUrl = this.imageThemeService.getImage(IMAGE_KEYS.ORCID_ID);
  }
}
