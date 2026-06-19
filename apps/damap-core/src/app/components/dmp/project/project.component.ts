import {
  Component,
  inject,
  Input,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';

import { Project } from '../../../domain/project';
import { UntypedFormControl } from '@angular/forms';
import { ConfigService } from '@damap-frontend-shell/app/services/config.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
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
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-dmp-project',
  templateUrl: './project.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
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
    TranslatePipe,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ProjectComponent {
  private configService = inject(ConfigService);

  @Input() projectStep: UntypedFormControl;
  readonly project = output<Project>();

  selectedView: 'primaryView' | 'secondaryView' = 'primaryView';

  constructor() {
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
