import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';
import { ConfigService } from '@damap-frontend-shell/app/services/config.service';
import { ToggleButtonsComponent } from '../../../../widgets/toggle-buttons/toggle-buttons.component';

@Component({
  selector: 'app-project-instruction',
  templateUrl: './project-instruction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ToggleButtonsComponent],
})
export class ProjectInstructionComponent implements OnInit {
  readonly selectionChange = output<'primaryView' | 'secondaryView'>();

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
