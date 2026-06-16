import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { AuthGuard, TenantGuard, BackendTranslateLoader } from '@damap/core';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
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
