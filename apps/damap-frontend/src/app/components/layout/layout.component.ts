import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService, BackendService, DashboardComponent } from '@damap/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { AdminComponent } from '../../../../../../libs/damap/src/lib/components/admin/admin.component'; // eslint-disable-line
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfigService } from '../../services/config.service';
import { DmpComponent } from '../../../../../../libs/damap/src/lib/components/dmp/dmp.component'; // eslint-disable-line
import { MatSidenav } from '@angular/material/sidenav';
import { PlansComponent } from '../../../../../../libs/damap/src/lib/components/plans/plans.component'; // eslint-disable-line
import { SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import pkg from '../../../../../../package.json'; // eslint-disable-line
import { ImageThemeService } from '../../services/image-theme.service';
import { IMAGE_KEYS } from '../../../../../../libs/damap/src/lib/domain/image-keys';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: false,
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('outlet') outlet: RouterOutlet | null;

  private routerEventsSubscription: Subscription;
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

  constructor(
    private auth: AuthService,
    private translate: TranslateService,
    private backendService: BackendService,
    private configService: ConfigService,
    private imageThemeService: ImageThemeService,
    private observer: BreakpointObserver,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.env = this.configService.getEnvironment();
    this.logoUrl = this.imageThemeService.getImage(IMAGE_KEYS.LOGO);
  }

  ngOnInit(): void {
    this.name = this.auth.getDisplayName();
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
        this.translate.use(browserLang?.match(/en/) ? browserLang : 'en');
        this.lang = this.translate.currentLang.toUpperCase();
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
  }

  private checkScreenSize(): void {
    this.isCollapsed = this.isSmallScreen;
  }

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
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
    } else if (
      componentInstance instanceof DashboardComponent ||
      componentInstance instanceof PlansComponent ||
      componentInstance == null
    ) {
      // Dashboard or router not yet initialized
      this.greeting =
        this.translate.instant('layout.menu.greeting') +
        ' ' +
        this.name +
        ' ' +
        this.translate.instant('admin.dashboard.title');
      this.summaryLine = 'dashboard.home.section-intro';
    } else if (componentInstance instanceof AdminComponent) {
      this.greeting =
        this.translate.instant('layout.menu.greeting') +
        ' ' +
        this.name +
        ' ' +
        this.translate.instant('admin.dashboard.title');
      this.summaryLine = 'admin.dashboard.section-intro';
    }
  }

  // TODO:  Update translation files to accept a parameter for strings where `Firstname` is used (https://github.com/ngx-translate/core?tab=readme-ov-file#4-define-the-translations)
  //        Provide name to translate pipe or directive.
  //        Remove this method.
  replaceFirstname(name: string, str: string): string {
    console.log(str);
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
