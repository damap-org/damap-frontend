import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach, afterEach, type MockedObject } from 'vitest';

import { LegalEthicalInstructionComponent } from './legal-ethical-instruction.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

describe('LegalEthicalInstructionComponent', () => {
  let component: LegalEthicalInstructionComponent;
  let fixture: ComponentFixture<LegalEthicalInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalEthicalInstructionComponent],
      imports: [TranslateDirective, TranslatePipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalEthicalInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selectedView as "primaryView"', () => {
    expect(component.selectedView).toBe('primaryView');
  });

  it('should emit "primaryView" on selectionChange', () => {
    vi.spyOn(component.selectionChange, 'emit').mockReturnValue(undefined);

    component.onSelectionChange('primaryView');

    expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
  });

  it('should emit the correct view when emitSelection is called', () => {
    vi.spyOn(component.selectionChange, 'emit').mockReturnValue(undefined);

    component.onSelectionChange('secondaryView');

    expect(component.selectedView).toBe('secondaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('secondaryView');
  });
});
