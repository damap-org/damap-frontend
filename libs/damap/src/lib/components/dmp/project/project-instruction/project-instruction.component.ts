import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ConfigService } from '../../../../../../../../apps/damap-frontend/src/app/services/config.service';
import { ToggleButtonsComponent } from '../../../../widgets/toggle-buttons/toggle-buttons.component';

@Component({
  selector: 'app-project-instruction',
  templateUrl: './project-instruction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ToggleButtonsComponent],
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
