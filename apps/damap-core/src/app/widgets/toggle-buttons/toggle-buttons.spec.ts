import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToggleButtonsComponent } from './toggle-buttons.component';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

describe('ToggleButtonsComponent', () => {
  let component: ToggleButtonsComponent;
  let fixture: ComponentFixture<ToggleButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleButtonsComponent],
      imports: [TranslateDirective, TranslatePipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default primaryView', () => {
    expect(component.selectedView).toBe('primaryView');
  });

  it('should emit primary on "ngOnInit"', () => {
    vi.spyOn(component.selectionChange, 'emit').mockReturnValue(undefined);
    component.ngOnInit();
    expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
  });

  it('should emit when emitSelection', () => {
    vi.spyOn(component.selectionChange, 'emit').mockReturnValue(undefined);
    component.emitSelection('secondaryView');
    expect(component.selectedView).toBe('secondaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('secondaryView');
  });

  it('should update when emitSelection', () => {
    component.emitSelection('secondaryView');
    expect(component.selectedView).toBe('secondaryView');
  });
});
