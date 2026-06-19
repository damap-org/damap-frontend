import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { vi, describe, it, expect } from 'vitest';

import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';

describe('AppComponent', () => {
  async function createComponent(appTitle: string | null = 'DAMAP Test') {
    const configService = {
      getAppTitle: vi.fn(() => appTitle),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        Title,
        { provide: ConfigService, useValue: configService },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();

    return {
      fixture,
      title: TestBed.inject(Title),
      configService,
    };
  }

  it('creates the app shell', async () => {
    const { fixture } = await createComponent();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('uses the configured app title', async () => {
    const { title, configService } = await createComponent('Custom DAMAP');

    expect(configService.getAppTitle).toHaveBeenCalledOnce();
    expect(title.getTitle()).toBe('Custom DAMAP');
  });

  it('falls back to the default app title', async () => {
    const { title } = await createComponent(null);

    expect(title.getTitle()).toBe('Damap Frontend');
  });
});
