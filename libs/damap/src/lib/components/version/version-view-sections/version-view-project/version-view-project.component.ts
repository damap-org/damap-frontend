import { Component, Input } from '@angular/core';
import { Project } from '../../../../domain/project';
import { DatePipe } from '@angular/common';
import { TagComponent } from '../../../../widgets/tag/tag.component';

@Component({
  selector: 'app-version-view-project',
  templateUrl: './version-view-project.component.html',
  styleUrls: [],
  imports: [TagComponent, DatePipe],
})
export class VersionViewProjectComponent {
  @Input() project: Project;
}
