import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Config, ColorTheme } from '@damap/core';
import {
  argbFromHex,
  CorePalette,
  hexFromArgb,
  Scheme,
} from '@material/material-color-utilities';
import { APP_ENV } from 'libs/damap/src/lib/constants';
import { Observable, tap } from 'rxjs';

export interface Colors {
  primary: string | null;
  secondary: string | null;
  tertiary: string | null;
  primaryContainer: string | null;
  secondaryContainer: string | null;
  tertiaryContainer: string | null;
}

@Injectable({ providedIn: 'root' })
export class ColorThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);
  private readonly backendUrl = APP_ENV.backendurl;

  colorsSignal = signal<Colors>(this.getEmptyColors());
  savedColorsSignal = signal<Colors>(this.getEmptyColors());
  exactColorModeSignal = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.applyMaterial3Tokens(
        this.colorsSignal(),
        this.exactColorModeSignal(),
      );
    });
  }

  public applyTheming(config: Config): void {
    const theme = config.colorTheme;
    if (!theme?.colors?.['primary']) return;

    const newColors: Colors = {
      primary: theme.colors['primary'] ?? null,
      secondary: theme.colors['secondary'] ?? null,
      tertiary: theme.colors['tertiary'] ?? null,
      primaryContainer: theme.colors['primaryContainer'] ?? null,
      secondaryContainer: theme.colors['secondaryContainer'] ?? null,
      tertiaryContainer: theme.colors['tertiaryContainer'] ?? null,
    };

    this.colorsSignal.set(newColors);
    this.savedColorsSignal.set(newColors);
    this.exactColorModeSignal.set(theme.exactColors);
  }

  public saveColors(): Observable<ColorTheme> {
    return this.http
      .put<ColorTheme>(`${this.backendUrl}admin/color-theme`, {
        colors: this.colorsSignal(),
        exactColors: this.exactColorModeSignal(),
      })
      .pipe(tap(() => this.savedColorsSignal.set(this.colorsSignal())));
  }

  private applyMaterial3Tokens(colors: Colors, exactMode: boolean): void {
    // 1. Generate Base Palette & Scheme
    const palette = CorePalette.fromColors({
      primary: argbFromHex(colors.primary || '#006699'),
      secondary: colors.secondary ? argbFromHex(colors.secondary) : undefined,
      tertiary: colors.tertiary
        ? argbFromHex(colors.tertiary || '#373737')
        : undefined,
    });
    const scheme = Scheme.lightFromCorePalette(palette);

    // 2. Helper to resolve Main Colors (Primary, Secondary, Tertiary)
    const getMainColor = (userHex: string | null, defaultArgb: number) =>
      exactMode && userHex ? userHex : hexFromArgb(defaultArgb);

    // 3. Helper to resolve Container Colors
    const getContainerColor = (userHex: string | null, defaultArgb: number) => {
      if (!userHex) return hexFromArgb(defaultArgb);
      if (exactMode) return userHex;
      const p = CorePalette.fromColors({ primary: argbFromHex(userHex) });
      return hexFromArgb(Scheme.lightFromCorePalette(p).primary);
    };

    // 4. Resolve Dynamic Values
    const primaryVal = getMainColor(colors.primary, scheme.primary);
    const secondaryVal = getMainColor(colors.secondary, scheme.secondary);
    const tertiaryVal = getMainColor(colors.tertiary, scheme.tertiary);

    const tokens: Record<string, string> = {
      // Custom Tokens defined by us
      '--custom-user-navbar-color': hexFromArgb(palette.n1.tone(25)),
      '--custom-primary-lightest': hexFromArgb(palette.a1.tone(100)),
      '--custom-primary-lightest-shadow': hexFromArgb(palette.a1.tone(95)),
      '--custom-accent-color-lighter': hexFromArgb(palette.a1.tone(60)),
      '--custom-accent-color-very-light': hexFromArgb(palette.a1.tone(98)),
      '--custom-tertiary-color-very-light': hexFromArgb(palette.a3.tone(98)),
      '--custom-error-color': hexFromArgb(scheme.error),
      '--custom-error-container': hexFromArgb(scheme.errorContainer),
      '--custom-on-error-container': hexFromArgb(scheme.onErrorContainer),
      '--custom-neutral-color-medium-light': hexFromArgb(palette.n1.tone(70)),
      '--custom-step-intro-color': hexFromArgb(palette.n2.tone(60)),
      '--custom-landing-page-info-bar-color': hexFromArgb(palette.n1.tone(40)),

      // Standard Material Tokens that are not used by Angular Material
      '--custom-primary-fixed': hexFromArgb(palette.a1.tone(90)),
      '--custom-primary-fixed-dim': hexFromArgb(palette.a1.tone(80)),
      '--custom-on-primary-fixed': hexFromArgb(palette.a1.tone(10)),
      '--custom-on-primary-fixed-variant': hexFromArgb(palette.a1.tone(30)),

      '--custom-secondary-fixed': hexFromArgb(palette.a2.tone(90)),
      '--custom-secondary-fixed-dim': hexFromArgb(palette.a2.tone(80)),
      '--custom-on-secondary-fixed': hexFromArgb(palette.a2.tone(10)),
      '--custom-on-secondary-fixed-variant': hexFromArgb(palette.a2.tone(30)),

      '--custom-tertiary-fixed': hexFromArgb(palette.a3.tone(90)),
      '--custom-tertiary-fixed-dim': hexFromArgb(palette.a3.tone(80)),
      '--custom-on-tertiary-fixed': hexFromArgb(palette.a3.tone(10)),
      '--custom-on-tertiary-fixed-variant': hexFromArgb(palette.a3.tone(30)),

      '--custom-surface-dim': hexFromArgb(palette.n1.tone(87)),
      '--custom-surface-bright': hexFromArgb(palette.n1.tone(98)),
      '--custom-surface-container-lowest': hexFromArgb(palette.n1.tone(100)),
      '--custom-surface-container': hexFromArgb(palette.n1.tone(94)),
      '--custom-surface-container-high': hexFromArgb(palette.n1.tone(92)),
      '--custom-surface-container-highest': hexFromArgb(palette.n1.tone(90)),

      // Material Tokens used by Angular Material
      '--mdc-theme-primary': primaryVal,
      '--mat-sys-primary': primaryVal,
      '--mat-focus-indicator-border-color': primaryVal,
      '--mdc-theme-on-primary': hexFromArgb(scheme.onPrimary),
      '--mdc-theme-primary-container': getContainerColor(
        colors.primaryContainer,
        scheme.primaryContainer,
      ),
      '--mdc-theme-on-primary-container': hexFromArgb(
        scheme.onPrimaryContainer,
      ),

      '--mdc-theme-secondary': secondaryVal,
      '--mdc-theme-on-secondary': hexFromArgb(scheme.onSecondary),
      '--mdc-theme-secondary-container': getContainerColor(
        colors.secondaryContainer,
        scheme.secondaryContainer,
      ),
      '--mdc-theme-on-secondary-container': hexFromArgb(
        scheme.onSecondaryContainer,
      ),

      '--mdc-theme-tertiary': tertiaryVal,
      '--mdc-theme-on-tertiary': hexFromArgb(scheme.onTertiary),
      '--mdc-theme-tertiary-container': getContainerColor(
        colors.tertiaryContainer,
        scheme.tertiaryContainer,
      ),
      '--mdc-theme-on-tertiary-container': hexFromArgb(
        scheme.onTertiaryContainer,
      ),

      '--mdc-theme-error': hexFromArgb(scheme.error),
      '--mdc-theme-on-error': hexFromArgb(scheme.onError),
      '--mdc-theme-error-container': hexFromArgb(scheme.errorContainer),
      '--mdc-theme-on-error-container': hexFromArgb(scheme.onErrorContainer),

      '--mdc-theme-background': hexFromArgb(scheme.background),
      '--mdc-theme-on-background': hexFromArgb(scheme.onBackground),
      '--mdc-theme-surface': hexFromArgb(scheme.surface),
      '--mdc-theme-on-surface': hexFromArgb(scheme.onSurface),
      '--mdc-theme-surface-variant': hexFromArgb(scheme.surfaceVariant),
      '--mdc-theme-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
      '--mdc-theme-outline': hexFromArgb(scheme.outline),
      '--mdc-theme-outline-variant': hexFromArgb(scheme.outlineVariant),
      '--mdc-theme-shadow': hexFromArgb(scheme.shadow),
      '--mdc-theme-scrim': hexFromArgb(scheme.scrim),
      '--mdc-theme-inverse-surface': hexFromArgb(scheme.inverseSurface),
      '--mdc-theme-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
      '--mdc-theme-inverse-primary': hexFromArgb(scheme.inversePrimary),
    };

    Object.entries(tokens).forEach(([key, val]) =>
      this.document.documentElement.style.setProperty(key, val),
    );
  }

  private getEmptyColors(): Colors {
    return {
      primary: null,
      secondary: null,
      tertiary: null,
      primaryContainer: null,
      secondaryContainer: null,
      tertiaryContainer: null,
    };
  }
}
