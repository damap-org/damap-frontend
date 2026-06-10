import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  UntypedFormArray,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardSubtitle,
  MatCardContent,
  MatCardTitleGroup,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { StorageFilterPipe } from './storage-filter.pipe';

@Component({
  selector: 'app-dmp-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  imports: [
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatIcon,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatCardTitleGroup,
    MatCardTitle,
    MatIconButton,
    MatFormField,
    MatSelect,
    MatOption,
    TranslateModule,
    StorageFilterPipe,
  ],
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
    private translateService: TranslateService,
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

  public getStorageTitle(storage: InternalStorage): string {
    const currentLanguage =
      this.translateService.currentLang ||
      localStorage.getItem('lang') ||
      this.translateService.defaultLang ||
      'en';

    const translation =
      storage.translations.find(t => t.languageCode === currentLanguage) ??
      storage.translations.find(t => t.languageCode === 'en') ??
      storage.translations[0];

    return translation?.title ?? '';
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
