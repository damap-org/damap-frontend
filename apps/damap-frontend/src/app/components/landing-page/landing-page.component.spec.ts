import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { TranslateTestingModule } from '@damap/core';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', [
      'isBackendDown',
    ]);
    configServiceSpy.isBackendDown.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent, TranslateTestingModule],
      providers: [
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
        { provide: ConfigService, useValue: configServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'mockValue' }),
            snapshot: {
              paramMap: {
                get: () => 'mockValue',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
