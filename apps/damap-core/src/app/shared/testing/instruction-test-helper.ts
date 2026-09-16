import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '@damap-frontend-core';
import { OAuthService } from 'angular-oauth2-oidc';

export function instructionTestHelper<T>(componentClass: { new (...args: any[]): T }) {
  let fixture: ComponentFixture<T>;
  let component: any;
  const oauthServiceSpy = {
    getAccessToken: vi.fn().mockReturnValue('test-token'),
    hasValidAccessToken: vi.fn().mockReturnValue(true),
    logOut: vi.fn(),
  };

  describe(`${componentClass.name} Tests`, () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [componentClass],
        providers: [
          { provide: TranslateService, useClass: TranslateServiceStub },
          {
            provide: OAuthService,
            useValue: oauthServiceSpy,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(componentClass);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default selectedView as "primaryView"', () => {
      expect(component.selectedView).toBe('primaryView');
    });

    it('should change selectedView to "secondaryView" and emit selectionChange', () => {
      if (typeof component.onSelectionChange === 'function') {
        vi.spyOn(component.selectionChange, 'emit').mockReturnValue(undefined);
        component.onSelectionChange('secondaryView');
        expect(component.selectedView).toBe('secondaryView');
        expect(component.selectionChange.emit).toHaveBeenCalledWith('secondaryView');
      }
    });

    it('should emit "primaryView" when onSelectionChange is called with "primaryView"', () => {
      if (typeof component.onSelectionChange === 'function') {
        vi.spyOn(component.selectionChange, 'emit').mockReturnValue(undefined);
        component.onSelectionChange('primaryView');
        expect(component.selectedView).toBe('primaryView');
        expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
      }
    });
  });
}
