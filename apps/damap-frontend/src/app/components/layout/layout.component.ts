import * as layoutTemplate from '../../../assets/i18n/layout/en.json';

import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService, DashboardComponent } from '@damap/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { ConfigService } from '../../services/config.service';
import { DmpComponent } from '../../../../../../libs/damap/src/lib/components/dmp/dmp.component'; // eslint-disable-line
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import pkg from '../../../../../../package.json'; // eslint-disable-line
import { AdminComponent } from '../../../../../../libs/damap/src/lib/components/admin/admin.component'; // eslint-disable-line
import { PlansComponent } from '../../../../../../libs/damap/src/lib/components/plans/plans.component'; // eslint-disable-line

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('outlet') outlet: RouterOutlet | null;

  private routerEventsSubscription: Subscription;
  public title = 'Data Management Plan';
  public version: string = pkg.version;
  public name: string;
  public lang = 'en';
  public isSmallScreen: boolean = false;
  public isCollapsed: boolean = false;
  public templateDataLayout = layoutTemplate;
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
    private configService: ConfigService,
    private observer: BreakpointObserver,
    private router: Router,
  ) {
    this.env = this.configService.getEnvironment();
  }

  ngOnInit(): void {
    this.name = this.auth.getDisplayName();
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
    this.lang = this.translate.currentLang.toUpperCase();
    this.observer.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
      this.checkScreenSize();
    });

    this.handleRouteChange();
  }

  ngAfterViewInit(): void {
    this.handleRouteChange();
    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.handleRouteChange();
      });
    this.checkScreenSize();
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
        this.templateDataLayout.layout.menu.greeting +
        ' ' +
        this.name +
        ' ' +
        this.templateDataLayout.layout.menu.titleDashboard;
      this.summaryLine = 'layout.menu.section';
    } else if (componentInstance instanceof AdminComponent) {
      this.greeting =
        this.templateDataLayout.layout.menu.greeting +
        ' ' +
        this.name +
        ' ' +
        this.templateDataLayout.layout.menu.titleDashboard;
      this.summaryLine = 'layout.menu.adminSection';
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
}
