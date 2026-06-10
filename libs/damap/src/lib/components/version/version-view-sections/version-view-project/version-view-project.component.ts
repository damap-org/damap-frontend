import { Component, Input } from '@angular/core';
import { Project } from '../../../../domain/project';
import { TagComponent } from '../../../../widgets/tag/tag.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-version-view-project',
  templateUrl: './version-view-project.component.html',
  styleUrls: [],
  imports: [TagComponent, DatePipe],
})
export class VersionViewProjectComponent {
  @Input() project: Project;
}
