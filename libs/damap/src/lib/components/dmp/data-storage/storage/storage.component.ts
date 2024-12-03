import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import {
  selectInternalStorages,
  selectInternalStoragesLoaded,
} from '../../../../store/selectors/internal-storage.selectors';

import { AppState } from '../../../../store/states/app.state';
import { InternalStorage } from '../../../../domain/internal-storage';
import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { MatDialog } from '@angular/material/dialog';
import { StorageInfoDialogComponent } from '../storage-dialog/storage-info-dialog.component';
import { loadInternalStorages } from '../../../../store/actions/internal-storage.actions';

@Component({
  selector: 'app-dmp-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
  @Input() dmpForm: UntypedFormGroup;
  @Input() storageStep: UntypedFormArray;
  @Input() datasets: UntypedFormArray;

  @Output() storageToAdd = new EventEmitter<InternalStorage>();
  @Output() storageToRemove = new EventEmitter<number>();

  internalStorages: InternalStorage[] = [];
  internalStoragesLoaded: LoadingState;
  showAdditionalStorage: boolean = false;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(selectInternalStoragesLoaded))
      .subscribe(val => (this.internalStoragesLoaded = val));
    this.store
      .pipe(select(selectInternalStorages))
      .subscribe(val => (this.internalStorages = val));
    this.getInternalStorages();
  }

  addStorage(storage: InternalStorage) {
    this.storageToAdd.emit(storage);
  }

  removeStorage(index: number) {
    this.storageToRemove.emit(index);
  }

  private getInternalStorages() {
    this.store.dispatch(loadInternalStorages());
  }

  get activeStorages() {
    return this.internalStorages.filter(
      storage => storage.active && storage.translations.length > 0,
    );
  }

  public getStorageTitle(storage: InternalStorage) {
    const translation = storage.translations.find(
      t => t.languageCode === 'eng',
    );
    return translation ? translation.title : storage.translations[0].title;
  }

  openStorageInfo(storage: InternalStorage) {
    const translation =
      storage.translations.find(t => t.languageCode === 'eng') ||
      storage.translations[0];
    this.dialog.open(StorageInfoDialogComponent, {
      width: '500px',
      data: {
        title: translation.title,
        description: translation.description,
        link: storage.url,
      },
    });
  }
}
