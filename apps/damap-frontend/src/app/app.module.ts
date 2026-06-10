import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { AuthGuard, TenantGuard, BackendTranslateLoader } from '@damap/core';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { ConsentGuard } from './guard/consent.guard';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// required for AOT compilation
export function HttpLoaderFactory(): BackendTranslateLoader {
  return new BackendTranslateLoader(environment.backendurl);
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
      defaultLanguage: localStorage.getItem('lang') ?? 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
    // Materials
    MatSnackBarModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
