import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { DoiSearchComponent } from './doi-search.component';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';
import { restrictedDatasetMock } from '../../mocks/dataset-mocks';

describe('DoiSearchComponent', () => {
  let component: DoiSearchComponent;
  let fixture: ComponentFixture<DoiSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DoiSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoiSearchComponent);
    component = fixture.componentInstance;
    component.result = restrictedDatasetMock;
    component.loading = LoadingState.NOT_LOADED;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should en-/disable the form control depending on the loading state', () => {
    const doiControl = component.form.get('doi');
    vi.spyOn(doiControl, 'setValue').mockReturnValue(undefined);
    vi.spyOn(doiControl, 'enable').mockReturnValue(undefined);
    vi.spyOn(doiControl, 'disable').mockReturnValue(undefined);

    component.loading = LoadingState.NOT_LOADED;
    expect(doiControl.disabled).toBe(false);

    component.loading = LoadingState.LOADING;
    component.ngOnChanges({
      loading: new SimpleChange(LoadingState.NOT_LOADED, LoadingState.LOADING, true),
    });
    expect(component.loading).toBe(LoadingState.LOADING);
    expect(doiControl.disable).toHaveBeenCalledTimes(1);

    component.loading = LoadingState.LOADED;
    component.ngOnChanges({
      loading: new SimpleChange(LoadingState.LOADING, LoadingState.LOADED, false),
    });
    expect(doiControl.setValue).toHaveBeenCalledTimes(1);
    expect(doiControl.enable).toHaveBeenCalledTimes(1);
  });

  it('should emit search term when form is valid', () => {
    vi.spyOn(component.termToSearch, 'emit').mockReturnValue(undefined);
    const doi = '10.12345/12345';
    component.form.get('doi').setValue(doi);
    component.search();
    expect(component.termToSearch.emit).toHaveBeenCalledTimes(1);
    expect(component.termToSearch.emit).toHaveBeenCalledWith(doi);
  });

  it('should not emit search term when form is invalid', () => {
    vi.spyOn(component.termToSearch, 'emit').mockReturnValue(undefined);
    const invalidDoi = 'invalid-doi';
    component.form.get('doi').setValue(invalidDoi);
    component.search();
    expect(component.termToSearch.emit).not.toHaveBeenCalled();
  });
});
