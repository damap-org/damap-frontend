import { Component, Input, OnChanges } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  UntypedFormControl,
  FormControl,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatHint,
  MatInput,
} from '@angular/material/input';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { AsyncPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import {
  LANGUAGE_CODE_OPTIONS,
  LanguageCodeOption,
} from '../../domain/language-codes';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { MatLabel } from '@angular/material/form-field';
import { filter, switchMap } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-code-input',
  templateUrl: './language-code-input.component.html',
  styleUrl: './language-code-input.component.css',
  standalone: true,
  imports: [
    MatHint,
    MatError,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    MatInput,
    MatFormField,
    MatLabel,
    UpperCasePipe,
    AsyncPipe,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class LanguageCodeInputComponent implements OnChanges {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() control!: FormControl;
  @Input() errorMessageRequired: string = undefined;
  @Input() errorMessageInvalid: string = undefined;
  @Input() errorMessageAlreadyExists: string = undefined;

  readonly languageOptions = LANGUAGE_CODE_OPTIONS;
  filteredLanguageOptions$!: Observable<LanguageCodeOption[]>;

  ngOnChanges() {
    if (!this.control) return;

    this.filteredLanguageOptions$ = this.control.valueChanges.pipe(
      startWith(this.control.value ?? ''),
      map(value => {
        const v = typeof value === 'string' ? value : value?.code ?? '';

        return this.filterLanguageOptions(v);
      }),
    );
  }

  getLanguageDisplayValue(code: string): string {
    if (!code) {
      return '';
    }

    const language = this.languageOptions.find(option => option.code === code);

    return language
      ? `${language.name} (${language.code.toUpperCase()})`
      : code;
  }

  private filterLanguageOptions(value: string): LanguageCodeOption[] {
    if (!value) {
      return this.languageOptions;
    }

    return this.languageOptions.filter(option => {
      const displayValue =
        `${option.name} (${option.code.toUpperCase()})`.toLowerCase();

      return (
        option.code.includes(value) ||
        option.name.toLowerCase().includes(value) ||
        displayValue.includes(value)
      );
    });
  }
}
