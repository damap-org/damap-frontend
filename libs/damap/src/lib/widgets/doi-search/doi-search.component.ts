import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Dataset } from '../../domain/dataset';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { doiValidator } from '../../validators/doi.validator';

@Component({
  selector: 'app-doi-search',
  templateUrl: './doi-search.component.html',
  styleUrls: ['./doi-search.component.css'],
})
export class DoiSearchComponent implements OnChanges {
  @Input() result: Dataset = undefined;
  @Input() duplicate: boolean = false;
  @Input() loading: LoadingState;
  @Output() termToSearch = new EventEmitter<string>();
  @Output() datasetToAdd = new EventEmitter<Dataset>();

  form = new UntypedFormGroup({
    doi: new UntypedFormControl('', {
      validators: [Validators.required, doiValidator()],
      updateOn: 'change',
    }),
  });

  readonly loadingState: any = LoadingState;

  constructor() {
    this.form.get('doi').valueChanges.subscribe(value => {
      if (value && !this.form.get('doi').touched) {
        this.form.get('doi').markAsTouched();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading) {
      if (this.loading === LoadingState.LOADED) {
        this.form.reset();
      }
      if (this.loading === LoadingState.LOADING) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  search() {
    if (this.form.valid) {
      this.termToSearch.emit(this.form.get('doi').value.trim());
    }
  }

  searchChange(searchInput: string) {
    this.form.patchValue({ doi: searchInput });
  }
}
