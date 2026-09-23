import { Component, OnInit, ChangeDetectionStrategy, output } from '@angular/core';
import { ToggleButtonsComponent } from '../../../../widgets/toggle-buttons/toggle-buttons.component';

@Component({
  selector: 'app-data-storage-instruction',
  templateUrl: './data-storage-instruction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ToggleButtonsComponent],
})
export class DataStorageInstructionComponent implements OnInit {
  readonly selectionChange = output<'primaryView' | 'secondaryView'>();

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
