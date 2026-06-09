import {
  enableProdMode,
  provideAppInitializer,
  inject,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { HttpLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { ConfigService } from './app/services/config.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AuthGuard, TenantGuard, BackendTranslateLoader } from '@damap/core';
import { ConsentGuard } from './app/guard/consent.guard';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, HttpBackend } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppStoreModule } from './app/store/app-store.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      AppStoreModule,
      OAuthModule.forRoot({
        resourceServer: {
          allowedUrls: [environment.backendurl],
          sendAccessToken: true,
        },
      }),
      // NGX Translate
      TranslateModule.forRoot({
        defaultLanguage: localStorage.getItem('lang') ?? 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
      // Materials
      MatSnackBarModule,
    ),
    provideAppInitializer(() => {
      const initializerFn = (
        (configService: ConfigService) => () =>
          configService.initializeApp()
      )(inject(ConfigService));
      return initializerFn();
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    AuthGuard,
    TenantGuard,
    ConsentGuard,
    provideRouter(APP_ROUTES),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
