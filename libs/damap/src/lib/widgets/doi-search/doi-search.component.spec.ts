import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
    spyOn(component.doi, 'setValue');
    spyOn(component.doi, 'enable');
    spyOn(component.doi, 'disable');

    component.loading = LoadingState.NOT_LOADED;
    expect(component.doi.disabled).toBe(false);

    component.loading = LoadingState.LOADING;
    component.ngOnChanges({
      loading: new SimpleChange(
        LoadingState.NOT_LOADED,
        LoadingState.LOADING,
        true,
      ),
    });
    expect(component.loading).toBe(LoadingState.LOADING);
    expect(component.doi.disable).toHaveBeenCalledTimes(1);

    component.loading = LoadingState.LOADED;
    component.ngOnChanges({
      loading: new SimpleChange(
        LoadingState.LOADING,
        LoadingState.LOADED,
        false,
      ),
    });
    expect(component.doi.setValue).toHaveBeenCalledTimes(1);
    expect(component.doi.enable).toHaveBeenCalledTimes(1);
  });

  it('extract the correct doi search term and search for it', () => {
    spyOn(component.termToSearch, 'emit');
    const doi = ' doi: 10.12345/12345 ';
    const searchTerm = '10.12345/12345';
    component.search(doi);
    expect(component.termToSearch.emit).toHaveBeenCalledOnceWith(searchTerm);
  });
});
