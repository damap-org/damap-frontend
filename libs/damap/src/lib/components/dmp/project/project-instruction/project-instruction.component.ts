import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project-instruction',
  templateUrl: './project-instruction.component.html',
})
export class ProjectInstructionComponent implements OnInit {
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

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
