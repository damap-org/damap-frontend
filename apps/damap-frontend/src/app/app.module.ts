import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EnvBannerModule, AuthGuard } from '@damap/core';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { ConsentGuard } from './guard/consent.guard';
import { ConsentModule } from './components/consent/consent.module';
import { LayoutModule } from './components/layout/layout.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    '/assets/i18n/layout/',
    '/assets/i18n/consent/',
    '/assets/i18n/landing-page/',
    '/assets/damap-core/i18n/dashboard/',
    '/assets/damap-core/i18n/plans/',
    '/assets/damap-core/i18n/http/',
    '/assets/damap-core/i18n/gdpr/',
    '/assets/damap-core/i18n/admin/',
    '/assets/damap-core/i18n/',
    '/assets/damap-core/i18n/templates/',
    '/assets/i18n/',
  ]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    AppStoreModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.backendurl],
        sendAccessToken: true,
      },
    }),

    // NGX Translate
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),

    // Materials
    MatSnackBarModule,

    // Modules
    LayoutModule,
    EnvBannerModule,
    ConsentModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        configService.initializeApp(),
      multi: true,
      deps: [ConfigService],
    },
    AuthGuard,
    ConsentGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
