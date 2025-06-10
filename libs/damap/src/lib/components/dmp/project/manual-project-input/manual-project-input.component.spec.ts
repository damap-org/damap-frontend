import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  mockManualProject,
  mockProject,
} from '../../../../mocks/project-mocks';

import { HarnessLoader } from '@angular/cdk/testing';
import { ManualProjectInputComponent } from './manual-project-input.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';

describe('ManualProjectInputComponent', () => {
  let component: ManualProjectInputComponent;
  let fixture: ComponentFixture<ManualProjectInputComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ManualProjectInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualProjectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger form patching depending whether project has university id or not', () => {
    spyOn(component.form, 'patchValue');

    component.project = mockProject;
    component.ngOnChanges({
      project: new SimpleChange(mockManualProject, mockProject, false),
    });
    expect(component.form.patchValue).toHaveBeenCalledTimes(0);

    component.project = mockManualProject;
    component.ngOnChanges({
      project: new SimpleChange(mockProject, mockManualProject, false),
    });
    expect(component.form.patchValue).toHaveBeenCalledTimes(1);
    expect(component.form.patchValue).toHaveBeenCalledWith(mockManualProject);
  });

  it('should emit updated project', waitForAsync(async () => {
    spyOn(component.projectUpdate, 'emit');
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(1);
    const button = buttons[0];
    let disabled = await button.isDisabled();
    expect(disabled).toBe(true);

    component.form.patchValue(mockManualProject);
    disabled = await button.isDisabled();
    expect(disabled).toBe(false);

    await button.click();
    expect(component.projectUpdate.emit).toHaveBeenCalledTimes(1);
  }));
});
