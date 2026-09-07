import { describe, expect, it, beforeEach, type MockedObject } from 'vitest';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageComponent } from './storage.component';
import { StorageFilterPipe } from './storage-filter.pipe';
import { StorageInfoDialogComponent } from '../storage-dialog/storage-info-dialog.component';
import { TranslateTestingModule } from '../../../../testing/translate-testing/translate-testing.module';
import { mockInternalStorage } from '../../../../mocks/storage-mocks';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;
  let mockDialog: MockedObject<MatDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StorageComponent, StorageFilterPipe],
      providers: [{ provide: MatDialog }],
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
