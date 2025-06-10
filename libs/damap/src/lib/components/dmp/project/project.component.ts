import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Project } from '../../../domain/project';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: [],
})
export class ProjectComponent {
  @Input() projectStep: UntypedFormControl;
  @Output() project = new EventEmitter<Project>();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  changeProject(project: Project): void {
    this.project.emit(project);
  }

  onViewChange(view: 'primaryView' | 'secondaryView'): void {
    this.selectedView = view;
  }
}
