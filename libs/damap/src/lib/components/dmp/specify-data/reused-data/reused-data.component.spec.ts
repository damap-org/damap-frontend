import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

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
    backendSpy = jasmine.createSpyObj('BackendService', ['searchDataset']);
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
    spyOn(component.datasetToAdd, 'emit');
    backendSpy.searchDataset.and.returnValue(of(restrictedDatasetMock));
    component.searchDataset('doi:10.12345/12345');

    expect(backendSpy.searchDataset).toHaveBeenCalledOnceWith(
      'doi:10.12345/12345',
    );
    expect(component.datasetToAdd.emit).toHaveBeenCalledOnceWith(
      restrictedDatasetMock,
    );
  });

  it('should remove duplicate DOI datasets', () => {
    backendSpy.searchDataset.and.returnValue(of(restrictedDatasetMock));

    expect(component.duplicate).toBeFalse();
    expect(component.result).toBeUndefined();
    expect(component.datasets.length).toBe(0);

    component.searchDataset('doi:10.12345/12345');
    expect(component.duplicate).toBeFalse();
    expect(component.result).toEqual(restrictedDatasetMock);
    expect(component.datasets.length).toBe(0);
    component.datasets.push(
      new UntypedFormGroup({
        datasetId: new UntypedFormControl({ identifier: 'doi:10.12345/12345' }),
      }),
    );

    component.searchDataset('doi:10.12345/12345');
    expect(component.duplicate).toBeTrue();
    expect(component.datasets.length).toBe(1);

    component.searchDataset('doi:10.12345/12346');
    expect(component.duplicate).toBeFalse();
    expect(component.datasets.length).toBe(1);
    component.datasets.push(
      new UntypedFormGroup({
        datasetId: new UntypedFormControl({ identifier: 'doi:10.12345/12346' }),
      }),
    );
    expect(component.datasets.length).toBe(2);
  });
});
