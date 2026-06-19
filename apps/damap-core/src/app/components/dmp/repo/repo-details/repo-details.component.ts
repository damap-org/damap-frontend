import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RepositoryDetails } from '../../../../domain/repository-details';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [UpperCasePipe, TranslatePipe],
})
export class RepoDetailsComponent {
  @Input() repo: RepositoryDetails;
}
