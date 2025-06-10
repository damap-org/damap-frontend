import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-storage-instruction',
  templateUrl: './data-storage-instruction.component.html',
})
export class DataStorageInstructionComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  ngOnInit(): void {
    this.emitSelection('primaryView');
  }

  emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectionChange.emit(view);
  }

  onViewChangeStorage(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
