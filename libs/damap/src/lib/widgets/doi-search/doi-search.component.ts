import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Dataset } from '../../domain/dataset';
import { UntypedFormControl } from '@angular/forms';
import { doiValidator } from '../../validators/doi.validator';
import { LoadingState } from '../../domain/enum/loading-state.enum';

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

  doi = new UntypedFormControl('', {
    validators: doiValidator(),
    updateOn: 'blur',
  });

  readonly loadingState: any = LoadingState;
  searchTerm: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading) {
      if (this.loading === LoadingState.LOADED) {
        this.doi.setValue('');
      }
      if (this.loading === LoadingState.LOADING) {
        this.doi.disable();
      } else {
        this.doi.enable();
      }
    }
  }

  search(term: string) {
    if (term.trim()) {
      term = term.substring(term.indexOf('10.')).trim();
      this.termToSearch.emit(term);
    }
  }

  searchChange(searchInput: string) {
    this.searchTerm = searchInput;
  }
}
