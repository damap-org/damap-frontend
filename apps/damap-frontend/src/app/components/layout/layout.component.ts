import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AuthService, BackendService } from '@damap/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subscription, filter, take } from 'rxjs';

import { AdminComponent } from '../../../../../../libs/damap/src/lib/components/admin/admin.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfigService } from '../../services/config.service';
import { DmpComponent } from '../../../../../../libs/damap/src/lib/components/dmp/dmp.component';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { SafeUrl } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import pkg from '../../../../../../package.json';
import { ImageThemeService } from '../../services/image-theme.service';
import { IMAGE_KEYS } from '../../../../../../libs/damap/src/lib/domain/image-keys';

import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { EnvBannerComponent } from '../../../../../../libs/damap/src/lib/widgets/env-banner/env-banner.component';
import { AppBannerComponent } from '../../../../../../libs/damap/src/lib/widgets/app-banner/app-banner.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatNavList,
    MatListItem,
    RouterLinkActive,
    MatDivider,
    MatTooltip,
    MatSidenavContent,
    EnvBannerComponent,
    AppBannerComponent,
    MatToolbar,
    MatToolbarRow,
    RouterOutlet,
    TranslatePipe,
  ],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private auth = inject(AuthService);
  private translate = inject(TranslateService);
  private backendService = inject(BackendService);
  private configService = inject(ConfigService);
  private imageThemeService = inject(ImageThemeService);
  private observer = inject(BreakpointObserver);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('outlet') outlet: RouterOutlet | null;

  private routerEventsSubscription: Subscription;
  private langChangeSubscription: Subscription;
  private greetingSubscription: Subscription;
  public logoUrl: SafeUrl;
  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'en';
  public availableLanguages: string[] = ['en'];
  public isSmallScreen: boolean = false;
  public isCollapsed: boolean = false;
  public icon = 'info';
  private dataInfoService: Subscription | null;
  public greeting: string;
  public instructions: string;
  public summaryLine: string;
  public isIntroShow: boolean = true;

  readonly env: string;

  constructor() {
    this.env = this.configService.getEnvironment();
    this.logoUrl = this.imageThemeService.getImage(IMAGE_KEYS.LOGO);
  }

  ngOnInit(): void {
    this.name = this.auth.getDisplayName();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      event => {
        this.lang = event.lang.toUpperCase();
        this.handleRouteChange();
      },
    );
    this.backendService.getLanguages().subscribe({
      next: langs => {
        this.availableLanguages = langs.length ? langs : ['en'];
        const savedLang = localStorage.getItem('lang');
        const browserLang = (
          this.translate.getBrowserLang() ?? 'en'
        ).toLowerCase();
        const preferred = savedLang ?? browserLang;
        const selected = this.availableLanguages.includes(preferred)
          ? preferred
          : this.availableLanguages[0];
        this.translate.use(selected);
        this.lang = selected.toUpperCase();
      },
      error: () => {
        const browserLang = this.translate.getBrowserLang();
        const selected = browserLang?.match(/en/) ? browserLang : 'en';
        this.translate.use(selected);
        this.lang = selected.toUpperCase();
      },
    });

    // the breakpoint (1300px) here can be adjusted based on design requirements or device-specific considerations.
    this.observer.observe(['(max-width: 480px)']).subscribe(result => {
      setTimeout(() => {
        this.isCollapsed = result.matches;
        this.cdr.detectChanges();
      });
    });
    this.handleRouteChange();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleRouteChange();
      this.routerEventsSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.handleRouteChange();
        });
      this.checkScreenSize();
    });
  }

  ngOnDestroy(): void {
    this.dataInfoService?.unsubscribe();
    this.routerEventsSubscription?.unsubscribe();
    this.langChangeSubscription?.unsubscribe();
    this.greetingSubscription?.unsubscribe();
  }

  private checkScreenSize(): void {
    this.isCollapsed = this.isSmallScreen;
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  public logout(): void {
    this.auth.logout();
  }
  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Handle UI updates when route changes. Update card content and listen to
   * step changes of the DMP component.
   * @return {void}
   */
  public isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  private handleRouteChange(): void {
    // unsubscribe, if subscribed before. will subscribe again when redirecting to DMP component
    this.dataInfoService?.unsubscribe();
    this.greetingSubscription?.unsubscribe();

    const componentInstance =
      this.outlet == null || !this.outlet.isActivated // outlet not yet initialized or not activated
        ? null
        : this.outlet.component;

    if (componentInstance instanceof DmpComponent) {
      // DMP component. Should listen to step changes and update text
      const dmpComponent = componentInstance as DmpComponent;
      this.dataInfoService = dmpComponent.instructionStep$.subscribe(value => {
        this.greeting = this.replaceFirstname(this.name, value.greeting);
        this.summaryLine = value.summaryLine;
      });
    } else {
      this.summaryLine =
        componentInstance instanceof AdminComponent
          ? 'admin.dashboard.section-intro'
          : 'layout.section-intro';
      this.greetingSubscription = this.translate
        .get(['layout.menu.greeting', 'admin.dashboard.greeting'])
        .pipe(take(1))
        .subscribe(t => {
          this.greeting =
            t['layout.menu.greeting'] +
            ' ' +
            this.name +
            ' ' +
            t['admin.dashboard.greeting'];
        });
    }
  }

  // TODO:  Update translation files to accept a parameter for strings where `Firstname` is used (https://github.com/ngx-translate/core?tab=readme-ov-file#4-define-the-translations)
  //        Provide name to translate pipe or directive.
  //        Remove this method.
  replaceFirstname(name: string, str: string): string {
    const regex = new RegExp(`\\b${'Firstname'}\\b`, 'g');
    if (regex.test(str)) {
      return str.replace(regex, name);
    } else {
      return str;
    }
  }

  isDefaultLogo(logoUrl: SafeUrl): boolean {
    const urlString = logoUrl?.toString() || '';
    return urlString.includes('assets/logo.svg');
  }
}
