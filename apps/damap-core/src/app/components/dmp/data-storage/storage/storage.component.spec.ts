import { describe, expect, it, vi, beforeEach, type MockedObject } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageComponent } from './storage.component';
import { StorageFilterPipe } from './storage-filter.pipe';
import { StorageInfoDialogComponent } from '../storage-dialog/storage-info-dialog.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockInternalStorage } from '../../../../mocks/storage-mocks';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;
  let mockDialog: MockedObject<MatDialog>;
  const form = new UntypedFormGroup({
    storage: new UntypedFormControl(),
  });

  beforeEach(async () => {
    mockDialog = {
      open: vi.fn(),
    } as unknown as MockedObject<MatDialog>;
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, StorageComponent, StorageFilterPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dmpForm', form);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog with storage info', () => {
    const expectedData = {
      title: 'Internal storage mock',
      description: 'Internal storage mock description',
      link: 'www',
    };
    component.openStorageInfo(mockInternalStorage);

    expect(mockDialog.open).toHaveBeenCalledWith(StorageInfoDialogComponent, {
      width: '500px',
      data: expectedData,
    });
  });
});
