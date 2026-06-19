import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { ToggleButtonsComponent } from '../../../../widgets/toggle-buttons/toggle-buttons.component';

@Component({
  selector: 'app-specify-data-instruction',
  templateUrl: './specify-data-instruction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ToggleButtonsComponent],
})
export class SpecifyDataInstructionComponent {
  readonly selectionChange = output<'primaryView' | 'secondaryView'>();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  onSelectionChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
    this.emitSelection(view);
  }

  private emitSelection(view: 'primaryView' | 'secondaryView'): void {
    this.selectionChange.emit(view);
  }
}
