import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let titleService: Title;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    titleService = TestBed.inject(Title);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should set the title to 'Damap Frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(titleService.getTitle()).toEqual(
      environment.title || 'Damap Frontend',
    );
  });
});
