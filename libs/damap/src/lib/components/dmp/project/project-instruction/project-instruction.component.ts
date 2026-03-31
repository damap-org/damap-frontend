import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../../../../../../../apps/damap-frontend/src/app/services/config.service';

@Component({
  selector: 'app-project-instruction',
  templateUrl: './project-instruction.component.html',
  standalone: false,
})
export class ProjectInstructionComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<
    'primaryView' | 'secondaryView'
  >();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';
  configService = inject(ConfigService);

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
