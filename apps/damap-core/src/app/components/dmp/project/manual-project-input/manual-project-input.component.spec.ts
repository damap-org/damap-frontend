import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { mockManualProject, mockProject } from '../../../../mocks/project-mocks';

import { HarnessLoader } from '@angular/cdk/testing';
import { ManualProjectInputComponent } from './manual-project-input.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('ManualProjectInputComponent', () => {
  let component: ManualProjectInputComponent;
  let fixture: ComponentFixture<ManualProjectInputComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        ManualProjectInputComponent,
      ],
      providers: [provideNativeDateAdapter()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

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
    vi.spyOn(component.form, 'patchValue').mockReturnValue(undefined);

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

  it('should emit updated project', async () => {
    vi.spyOn(component.projectUpdate, 'emit').mockReturnValue(undefined);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    // no idea what the first button is, it appeared after the angular update to 22
    expect(buttons.length).toBe(2);
    const button = buttons[1];
    let disabled = await button.isDisabled();
    expect(disabled).toBe(true);

    component.form.patchValue(mockManualProject);
    disabled = await button.isDisabled();
    expect(disabled).toBe(false);

    await button.click();
    expect(component.projectUpdate.emit).toHaveBeenCalledTimes(1);
  });
});
