# Customisation

The damap-frontend is customized by forking this repository and adding graphic,
and custom styling, as well as editing the translations to contain the
information necessary for your institution.
Thus adapting the configuration for your environment.

## Structure

The project is structured as follows:

```
apps
 └─── damap-frontend      # The frontend application that can be customised

 libs
  └─── damap              # The damap library that contains the core functionality
```

`apps/damap-frontend` is the part of the project that can be customised. Modifications here _should_ not cause any merge
conflicts.

`libs/damap` contains the core functionality of DAMAP and should not be modified in your personal project.

The frontend only contains very little config information, which is the address of the backend from where it will fetch the
necessary config data and the title for the html title tag in index.html. It is stored in [environment.ts](apps/damap-frontend/src/environments/environment.ts) (
and [environment.prod.ts](apps/damap-frontend/src/environments/environment.prod.ts) respectively)
and can be changed. However, you should **NOT** change the keys (`production` and `backendurl`) as the library depends
on them.

This happens in the following section:

```typescript
providers: [
  {
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () => configService.initializeApp(),
    deps: [ConfigService],
    multi: true,
  },
];
```

On startup the app will use the [ConfigService](libs/damap/src/lib/services/config.service.ts) to fetch the data.
For now this is only the address of your identity provider and whether the application is running as a `DEV` or `PROD`
instance. It also redirects the user to the identity provider if they are not authenticated.
All config values are set
in [application.yaml](https://github.com/tuwien-csd/damap-backend/blob/next/src/main/resources/application.yaml) in the
backend and exposed via the `/api/config` endpoint.

We recommend to not change this service as it _might_ change in the future.

For more details on the backend project, refer to [damap-backend](https://github.com/tuwien-csd/damap-backend).

### Authentication

We use [OpenID Connect](https://openid.net/connect/) for authentication, which is handled in
the [ConfigService](apps/damap-frontend/src/app/services/config.service.ts) and the following section
of [AppModule](apps/damap-frontend/src/app/app.module.ts):

```typescript
OAuthModule.forRoot({
  resourceServer: {
    allowedUrls: [environment.backendurl],
    sendAccessToken: true,
  },
});
```

All application [routes](apps/damap-frontend/src/app/app.routes.ts) are protected by
the [AuthGuard](libs/damap/src/lib/guards/auth.guard.ts).

## What to change

In order to customize this project you may want to adapt some files.

### Layout

The layout of the application is defined in the [LayoutModule](libs/layout/src/lib/layout.module.ts), or more
specifically in the [LayoutComponent](libs/layout/src/lib/layout/layout.component.ts).

Your can change this file to adapt the layout to your needs, however, you should keep `<router-outlet></router-outlet>`
in the template.

- Logo: Provide your [logo](src/assets/logo.svg) as src/assets/logo.svg
- Logo link: You can change the link of your logo by setting the translation key `layout.logo.text`
  in [i18n/layout/en.json](apps/damap-frontend/src/assets/i18n/layout/en.json)
- Theme: to customize the theme adapt the files
  - [custom-theme.scss](apps/damap-frontend/src/themes/custom-theme.scss) and
  - [custom-palettes.scss](apps/damap-frontend/src/themes/custom-palettes.scss)
- Translations: [src/assets/i18n/layout/](apps/damap-frontend/src/assets/layout/en.json) (
  see [Translations](#translations) for
  more information)

For more information on theming:
https://material.angular.io/guide/theming & https://github.com/angular/components/blob/master/guides/theming.md

### Translations

We use [NGX Translate](https://github.com/ngx-translate/core) for translations.
Notice that when you change the language in the application, this only affects the UI part.
The language of the form is defined by the exported template's language and cannot be changed independently.
For this reason we use two independent `TranslateModule`s, one for the UI (template independent parts) and one for the
DMP form.

Translation files for the UI are configured in [AppModule](apps/damap-frontend/src/app/app.module.ts), those for the DMP
form in [DmpModule](libs/damap/src/lib/components/dmp/dmp.module.ts).

In each module the `HttpLoaderFactory` defines in which folders the translations are located.

```typescript
export function HttpLoaderFactory(http: HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/layout/', suffix: '.json' },
    { prefix: './assets/i18n/consent/', suffix: '.json' },
    { prefix: './assets/i18n/', suffix: '.json' },
  ]);
}
```

You can modify the translations for the dmp form in [assets/i18n/en.json](apps/damap-frontend/src/assets/i18n/en.json).
The content of this file will override that of the library, so if you want to change a translation, you can just specify
a new one using the translation key of the one you want to override, e.g.:

```json
{
  "title": "My new title"
}
```

Please only use this file for modifications and do
not change the files used in the library to prevent issues with future updates. In case you do not need to modify any
translation just leave it empty (but keep the curly bracket `{}`).
To modify the translations for the UI, you can use the files in `assets/i18n/*/` or specify a new one and override the
existing keys (or simply use [assets/i18n/en.json](apps/damap-frontend/src/assets/i18n/en.json)).
Note that you'll also need to add the new file to the `HttpLoaderFactory` in the `AppModule` and make sure that it's
loaded last.

### Consent Popup

There is a consent popup defined
in [ConsentComponent](apps/damap-frontend/src/app/components/consent/consent.component.ts)
which you can modify as you see fit.
The [RouterModule](apps/damap-frontend/src/app/app.routes.ts) uses
the [ConsentGuard](apps/damap-frontend/src/app/guard/consent.guard.ts) to protect all routes, but you can
remove it in case you don't need it.

## What if I need to adapt the library implementation?

We strongly recommend to not change the library implementation, as it is the core of the application.
It will likely create problems with future updates and merge conflicts as this part is subject to a lot of changes.
If you want to propose changes to the library,
please [open an issue](https://github.com/tuwien-csd/damap-frontend/issues/new/choose).
