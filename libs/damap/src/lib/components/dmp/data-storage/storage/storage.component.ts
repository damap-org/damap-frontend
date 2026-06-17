import {
  Component,
  computed,
  inject,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { InternalStorage } from '../../../../domain/internal-storage';
import { MatDialog } from '@angular/material/dialog';
import { StorageInfoDialogComponent } from '../storage-dialog/storage-info-dialog.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InternalStorageStore } from '../../../../data-access/internal-storage.store';
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
  changeDetection: ChangeDetectionStrategy.Eager,
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
    TranslatePipe,
    StorageFilterPipe,
  ],
})
export class StorageComponent {
  readonly dmpForm = input<UntypedFormGroup>(undefined);
  readonly storageStep = input<UntypedFormArray>(undefined);
  readonly datasets = input<UntypedFormArray>(undefined);

  readonly storageToAdd = output<InternalStorage>();
  readonly storageToRemove = output<number>();

  showAdditionalStorage: boolean = false;

  private readonly store = inject(InternalStorageStore);
  private readonly dialog = inject(MatDialog);
  private readonly translateService = inject(TranslateService);

  readonly activeStorages = computed(() =>
    this.store
      .internalStorages()
      .filter(storage => storage.active && storage.translations.length > 0),
  );

  addStorage(storage: InternalStorage) {
    this.storageToAdd.emit(storage);
  }

  removeStorage(index: number) {
    this.storageToRemove.emit(index);
  }

  public getStorageTitle(storage: InternalStorage): string {
    const currentLanguage =
      this.translateService.getCurrentLang() ||
      localStorage.getItem('lang') ||
      this.translateService.getFallbackLang() ||
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
