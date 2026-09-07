import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { BackendService } from '../../../services/backend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackService } from '../../../services/feedback.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { TranslationManagementComponent } from './translation-management.component';
import { of } from 'rxjs';

describe('TranslationManagementComponent', () => {
  let component: TranslationManagementComponent;
  let fixture: ComponentFixture<TranslationManagementComponent>;

  const backendServiceMock = {
    getLanguages: vi.fn().mockName('BackendService.getLanguages'),
    getTranslations: vi.fn().mockName('BackendService.getTranslations'),
    updateTranslation: vi.fn().mockName('BackendService.updateTranslation'),
    createLanguage: vi.fn().mockName('BackendService.createLanguage'),
    deleteLanguage: vi.fn().mockName('BackendService.deleteLanguage'),
  };
  const feedbackServiceMock = {
    success: vi.fn().mockName('FeedbackService.success'),
    error: vi.fn().mockName('FeedbackService.error'),
  };
  const matDialogMock = {
    open: () => ({
      afterClosed: () => of(null),
    }),
  };

  const sampleTranslations = [
    {
      id: 1,
      key: 'step1.title',
      language: 'en',
      defaultValue: 'Choose project',
      value: null,
      active: true,
    },
    {
      id: 2,
      key: 'step1.button_right',
      language: 'en',
      defaultValue: 'Input project manually',
      value: 'Input project by hand',
      active: true,
    },
  ];

  beforeEach(async () => {
    backendServiceMock.getLanguages.mockReturnValue(of(['en']));
    backendServiceMock.getTranslations.mockReturnValue(of(sampleTranslations));
    await TestBed.configureTestingModule({
      declarations: [TranslationManagementComponent],
      imports: [
        BrowserAnimationsModule,
        TranslateDirective,
        TranslatePipe,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
      ],
      providers: [
        { provide: BackendService, useValue: backendServiceMock },
        { provide: FeedbackService, useValue: feedbackServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads translations and builds sections', () => {
    expect(component.sections).toContain('step1');
    expect(component.filteredTranslations.length).toBe(2);
  });

  it('filters custom values', () => {
    component.statusFilterControl.setValue('custom');
    expect(component.filteredTranslations.length).toBe(1);
    expect(component.filteredTranslations[0].custom).toBeTruthy();
  });
});
