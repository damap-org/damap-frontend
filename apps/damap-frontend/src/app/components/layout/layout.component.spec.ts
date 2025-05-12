import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';
import { By } from '@angular/platform-browser';
import { ConfigService } from '../../services/config.service';
import { LayoutComponent } from './layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthService } from 'angular-oauth2-oidc';
import { TranslateTestingModule } from '@damap/core';
import { of } from 'rxjs';

@Component({
  template: '',
  standalone: false,
})
class DummyComponent {}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let breakpointObserver: BreakpointObserver;
  let sidenav: MatSidenav;

  beforeEach(waitForAsync(() => {
    const mockRouterOutlet = {
      component: DummyComponent,
      isActivated: true,
      activate: jasmine.createSpy('activate'),
    };

    const mockRouter = {
      events: of({}),
      routerState: {
        root: {},
      },
      navigate: jasmine.createSpy('navigate'),
      createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({}),
      serializeUrl: jasmine
        .createSpy('serializeUrl')
        .and.returnValue('mock-url'),
    };

    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNBZG1pbiI6dHJ1ZX0.dummySignature';

    const oauthSpy = jasmine.createSpyObj('OAuthService', [
      'getIdentityClaims',
      'getAccessToken',
    ]);
    oauthSpy.getIdentityClaims.and.returnValue({ name: 'name' });
    oauthSpy.getAccessToken.and.returnValue(mockToken);

    const configSpy = jasmine.createSpyObj('ConfigService', ['getEnvironment']);
    configSpy.getEnvironment.and.returnValue('DEV');

    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    breakpointObserverSpy.observe.and.returnValue(of({ matches: false }));

    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
      ],
      declarations: [LayoutComponent, DummyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: OAuthService, useValue: oauthSpy },
        { provide: ConfigService, useValue: configSpy },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
        { provide: Router, useValue: mockRouter },
        { provide: RouterOutlet, useValue: mockRouterOutlet },
      ],
    }).compileComponents();
    breakpointObserver = TestBed.inject(BreakpointObserver);
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      sidenav = fixture.debugElement.query(
        By.directive(MatSidenav),
      ).componentInstance;
      sidenav._content = {
        nativeElement: document.createElement('div'),
      } as any;
    });
  }));

  function setScreenSize(isSmallScreen: boolean): void {
    (breakpointObserver.observe as jasmine.Spy).and.returnValue(
      of({ matches: isSmallScreen }),
    );
    component.ngOnInit();
    fixture.detectChanges();
  }

  function toggleMenu(): void {
    component.toggleMenu();
    fixture.detectChanges();
  }

  it('should create the component', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  }));

  it('should collapse sidenav on small screen', waitForAsync(() => {
    (breakpointObserver.observe as jasmine.Spy).and.returnValue(
      of({ matches: false }),
    );
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.isSmallScreen).toBeFalse();
      expect(component.isCollapsed).toBeFalse();

      fixture.detectChanges();
      expect(sidenav.opened).toBeTrue();
    });
  }));

  it('should expand sidenav on large screen', waitForAsync(() => {
    setScreenSize(false);

    fixture.whenStable().then(() => {
      expect(component.isSmallScreen).toBeFalse();
      expect(component.isCollapsed).toBeFalse();
      expect(sidenav.opened).toBeTrue();
    });
  }));

  it('should toggle the menu on desktop (isSmallScreen = false)', waitForAsync(() => {
    setScreenSize(false);

    component.isCollapsed = false;
    toggleMenu();
    expect(component.isCollapsed).toBeTrue();

    toggleMenu();
    expect(component.isCollapsed).toBeFalse();
  }));

  it('should not toggle the menu on mobile (isSmallScreen = true)', waitForAsync(() => {
    setScreenSize(true);

    component.isCollapsed = true;
    toggleMenu();
    expect(component.isCollapsed).toBeFalse();
  }));

  it('should replace the firstname word for the user name', waitForAsync(() => {
    const result = component.replaceFirstname(
      'User',
      'Hi Firstname, let’s get started',
    );
    expect(result).toBe('Hi User, let’s get started');
  }));

  it('should not replace any word', waitForAsync(() => {
    const result = component.replaceFirstname('User', 'Hi, let’s get started');
    expect(result).toBe('Hi, let’s get started');
  }));
});
