import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataSource } from '../../../../domain/enum/data-source.enum';
import { DatasetDialogComponent } from './dataset-dialog.component';
import { FormService } from '../../../../services/form.service';
import { IdentifierType } from '../../../../domain/enum/identifier-type.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { closedDatasetMock } from '../../../../mocks/dataset-mocks';

describe('DatasetDialogComponent', () => {
  let component: DatasetDialogComponent;
  let fixture: ComponentFixture<DatasetDialogComponent>;
  let formServiceStub: Partial<FormService>;

  beforeEach(waitForAsync(() => {
    formServiceStub = {
      createDatasetFormGroup(title: string): UntypedFormGroup {
        return new UntypedFormGroup({
          title: new UntypedFormControl(title),
          source: new UntypedFormControl(DataSource.REUSED),
          type: new UntypedFormControl([]),
          size: new UntypedFormControl(0),
          datasetId: new UntypedFormControl({
            identifier: 'XXXXX',
            type: IdentifierType.DOI,
          }),
        });
      },
    };
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateTestingModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DatasetDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: (value?: any) => value } },
        { provide: FormService, useValue: formServiceStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { dataset: closedDatasetMock, mode: 'edit' },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog without change', () => {
    spyOn(component.dialogRef, 'close');
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with change', () => {
    spyOn(component.dialogRef, 'close');
    component.onDialogClose();
    expect(component.dialogRef.close).toHaveBeenCalledWith({
      title: closedDatasetMock.title,
      source: closedDatasetMock.source,
      type: closedDatasetMock.type,
      size: closedDatasetMock.size,
      datasetId: closedDatasetMock.datasetId,
    });
  });
});
