import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { StorageComponent } from './storage.component';
import { StorageFilterPipe } from './storage-filter.pipe';
import { StorageInfoDialogComponent } from '../storage-dialog/storage-info-dialog.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockInternalStorage } from '../../../../mocks/storage-mocks';
import { InternalStorageStore } from '../../../../data-access/internal-storage.store';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [TranslateTestingModule, StorageComponent, StorageFilterPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: InternalStorageStore,
          useValue: { internalStorages: signal([mockInternalStorage]) },
        },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog with storage info', () => {
    const expectedData = {
      title: 'Test Title',
      description: 'Test Description',
      link: 'https://example.com',
    };
    component.openStorageInfo(mockInternalStorage);

    expect(mockDialog.open).toHaveBeenCalledWith(StorageInfoDialogComponent, {
      width: '500px',
      data: expectedData,
    });
  });
});
