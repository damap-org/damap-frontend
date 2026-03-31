import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Project } from '../../../domain/project';
import { UntypedFormControl } from '@angular/forms';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: [],
  standalone: false,
})
export class ProjectComponent {
  @Input() projectStep: UntypedFormControl;
  @Output() project = new EventEmitter<Project>();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  constructor(private configService: ConfigService) {
    if (this.configService.getProjectService() === 'disabled') {
      this.selectedView = 'secondaryView';
    }
  }

  changeProject(project: Project): void {
    this.project.emit(project);
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
