import { Component, inject, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ImageThemeService } from '@damap-frontend-shell/app/services/image-theme.service';
import { IMAGE_KEYS } from '../../domain/image-keys';

@Component({
  selector: 'app-orcid',
  templateUrl: './orcid.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./orcid.component.css'],
})
export class OrcidComponent implements OnInit {
  private readonly imageThemeService = inject(ImageThemeService);
  readonly orcidId = input<string>(undefined);

  logoUrl: SafeUrl;

  ngOnInit() {
    this.logoUrl = this.imageThemeService.getImage(IMAGE_KEYS.ORCID_ID);
  }
}
