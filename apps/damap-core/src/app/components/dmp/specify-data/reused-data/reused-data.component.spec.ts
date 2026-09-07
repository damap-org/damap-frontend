import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { BackendService } from '../../../../services/backend.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReusedDataComponent } from './reused-data.component';
import { of } from 'rxjs';
import { restrictedDatasetMock } from '../../../../mocks/dataset-mocks';

describe('ReusedDataComponent', () => {
  let component: ReusedDataComponent;
  let fixture: ComponentFixture<ReusedDataComponent>;
  let backendSpy;

  beforeEach(waitForAsync(() => {
    backendSpy = {
      searchDataset: vi.fn().mockName('BackendService.searchDataset'),
    };
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ReusedDataComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BackendService, useValue: backendSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusedDataComponent);
    component = fixture.componentInstance;
    component.specifyDataStep = new UntypedFormGroup({
      reusedKind: new UntypedFormControl(undefined),
    });
    component.datasets = new UntypedFormArray([]); // Initialize the datasets FormArray
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search and add dataset with doi', () => {
    vi.spyOn(component.datasetToAdd, 'emit').mockReturnValue(undefined);
    backendSpy.searchDataset.mockReturnValue(of(restrictedDatasetMock));
    component.searchDataset('doi:10.12345/12345');

    expect(backendSpy.searchDataset).toHaveBeenCalledTimes(1);

    expect(backendSpy.searchDataset).toHaveBeenCalledWith('doi:10.12345/12345');
    expect(component.datasetToAdd.emit).toHaveBeenCalledTimes(1);
    expect(component.datasetToAdd.emit).toHaveBeenCalledWith(restrictedDatasetMock);
  });

  it('should remove duplicate DOI datasets', () => {
    backendSpy.searchDataset.mockReturnValue(of(restrictedDatasetMock));

    expect(component.duplicate).toBe(false);
    expect(component.result).toBeUndefined();
    expect(component.datasets.length).toBe(0);

    component.searchDataset('doi:10.12345/12345');
    expect(component.duplicate).toBe(false);
    expect(component.result).toEqual(restrictedDatasetMock);
    expect(component.datasets.length).toBe(0);
    component.datasets.push(
      new UntypedFormGroup({
        datasetId: new UntypedFormControl({ identifier: 'doi:10.12345/12345' }),
      }),
    );

    component.searchDataset('doi:10.12345/12345');
    expect(component.duplicate).toBe(true);
    expect(component.datasets.length).toBe(1);

    component.searchDataset('doi:10.12345/12346');
    expect(component.duplicate).toBe(false);
    expect(component.datasets.length).toBe(1);
    component.datasets.push(
      new UntypedFormGroup({
        datasetId: new UntypedFormControl({ identifier: 'doi:10.12345/12346' }),
      }),
    );
    expect(component.datasets.length).toBe(2);
  });
});
