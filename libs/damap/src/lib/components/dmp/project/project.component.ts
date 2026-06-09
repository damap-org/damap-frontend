import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Project } from '../../../domain/project';
import { UntypedFormControl } from '@angular/forms';
import { ConfigService } from '../../../../../../../apps/damap-frontend/src/app/services/config.service';
import { DatePipe } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ProjectListComponent } from './project-list/project-list.component';
import { ManualProjectInputComponent } from './manual-project-input/manual-project-input.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: [],
  imports: [
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatIconButton,
    ProjectListComponent,
    ManualProjectInputComponent,
    DatePipe,
    TranslateModule,
  ],
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
