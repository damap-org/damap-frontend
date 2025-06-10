import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';

export function instructionTestHelper<T>(componentClass: {
  new (...args: any[]): T;
}) {
  let fixture: ComponentFixture<T>;
  let component: any;

  describe(`${componentClass.name} Tests`, () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [componentClass],
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
        spyOn(component.selectionChange, 'emit');
        component.onSelectionChange('secondaryView');
        expect(component.selectedView).toBe('secondaryView');
        expect(component.selectionChange.emit).toHaveBeenCalledWith(
          'secondaryView',
        );
      }
    });

    it('should emit "primaryView" when onSelectionChange is called with "primaryView"', () => {
      if (typeof component.onSelectionChange === 'function') {
        spyOn(component.selectionChange, 'emit');
        component.onSelectionChange('primaryView');
        expect(component.selectedView).toBe('primaryView');
        expect(component.selectionChange.emit).toHaveBeenCalledWith(
          'primaryView',
        );
      }
    });
  });
}
