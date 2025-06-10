import { NgModule } from '@angular/core';
import { AppBannerComponent } from './app-banner.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [AppBannerComponent],
  imports: [
    CommonModule,
    TranslateModule,

    // Materials
    MatCardModule,
    MatIcon,
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
