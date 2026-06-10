import { NgModule } from '@angular/core';
import { AppBannerComponent } from './app-banner.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // Materials
    MatCardModule,
    MatIcon,
    AppBannerComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    AppBannerComponent,
    // Materials
    MatCardModule,
  ],
})
export class AppBannerModule {}
