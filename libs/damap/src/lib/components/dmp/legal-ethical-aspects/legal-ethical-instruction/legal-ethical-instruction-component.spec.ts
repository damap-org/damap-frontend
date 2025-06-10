import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalEthicalInstructionComponent } from './legal-ethical-instruction.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('LegalEthicalInstructionComponent', () => {
  let component: LegalEthicalInstructionComponent;
  let fixture: ComponentFixture<LegalEthicalInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalEthicalInstructionComponent],
      imports: [TranslateModule.forRoot()],
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
    spyOn(component.selectionChange, 'emit');

    component.onSelectionChange('primaryView');

    expect(component.selectionChange.emit).toHaveBeenCalledWith('primaryView');
  });

  it('should emit the correct view when emitSelection is called', () => {
    spyOn(component.selectionChange, 'emit');

    component.onSelectionChange('secondaryView');

    expect(component.selectedView).toBe('secondaryView');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      'secondaryView',
    );
  });
});
