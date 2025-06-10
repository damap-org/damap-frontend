import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConfigService } from './services/config.service';
import { Title } from '@angular/platform-browser';

describe('AppComponent', () => {
  let titleService: Title;
  let mockConfigService: jasmine.SpyObj<ConfigService>;

  beforeEach(waitForAsync(() => {
    mockConfigService = jasmine.createSpyObj('ConfigService', ['getAppTitle']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        Title,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should set the title to the value provided by ConfigService`, () => {
    const appTitle = 'Custom App Title';
    mockConfigService.getAppTitle.and.returnValue(appTitle);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(titleService.getTitle()).toEqual(appTitle);
  });

  it(`should set the title to 'Damap Frontend' if ConfigService returns null or undefined`, () => {
    mockConfigService.getAppTitle.and.returnValue('');

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(titleService.getTitle()).toEqual('Damap Frontend');
  });
});
