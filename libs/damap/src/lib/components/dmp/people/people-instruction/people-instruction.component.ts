import { Component, EventEmitter, Output } from '@angular/core';
import { ToggleButtonsComponent } from '../../../../widgets/toggle-buttons/toggle-buttons.component';

@Component({
    selector: 'app-people-instruction',
    templateUrl: './people-instruction.component.html',
    imports: [ToggleButtonsComponent],
})
export class PeopleInstructionComponent {
  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  onSelectionChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
    this.emitSelection(view);
  }

  private emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectionChange.emit(view);
  }
}
