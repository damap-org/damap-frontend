import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Contributor } from '../../domain/contributor';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css'],
})
export class PersonSearchComponent {
  @Input() result: Contributor[] = [];
  @Output() termToSearch = new EventEmitter<string>();
  @Output() personToAdd = new EventEmitter<Contributor>();

  currentSearchTerm: string = '';

  search(term: string) {
    this.currentSearchTerm = term.trim();
    if (this.currentSearchTerm) {
      this.termToSearch.emit(this.currentSearchTerm);
    } else {
      this.termToSearch.emit('');
      this.result = [];
    }
  }

  selectPerson(event: MatSelectionListChange): void {
    let person = event.source.selectedOptions.selected[0]?.value;
    if (person) {
      this.personToAdd.emit(person);
    }
  }
}
