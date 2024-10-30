import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWrapperOptionsComponent } from './input-wrapper-options.component';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('InputWrapperOptionsComponent', () => {
  let component: InputWrapperOptionsComponent;
  let fixture: ComponentFixture<InputWrapperOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputWrapperOptionsComponent],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputWrapperOptionsComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.control = new UntypedFormControl('');
    component.options = {
      option1: 'Value 1',
      option2: 'Value 2',
      option3: 'Value 3',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the label correctly', () => {
    const labelElement = fixture.debugElement.query(
      By.css('mat-label'),
    ).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should filter options correctly', () => {
    expect(component.filteredOptions).toEqual([
      'option1',
      'option2',
      'option3',
    ]);
  });

  it('should emit inputChange when the input changes', () => {
    spyOn(component.inputChange, 'emit');
    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;

    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.inputChange.emit).toHaveBeenCalledWith('New Value');
  });

  it('should set control value and emit inputChange on selectOption', () => {
    spyOn(component.inputChange, 'emit');
    const optionKey = 'option1';
    const expectedValue = component.options[optionKey];

    component.selectOption(optionKey);

    expect(component.control.value).toBe(expectedValue);
    expect(component.inputChange.emit).toHaveBeenCalledWith(expectedValue);
  });

  it('should render options in the autocomplete dropdown', () => {
    const matOptions = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(matOptions.length).toBe(3);
    expect(matOptions[0].nativeElement.textContent).toContain('option1');
    expect(matOptions[1].nativeElement.textContent).toContain('option2');
    expect(matOptions[2].nativeElement.textContent).toContain('option3');
  });
});
