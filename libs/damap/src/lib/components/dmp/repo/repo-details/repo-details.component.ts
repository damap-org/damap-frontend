import { Component, Input } from '@angular/core';
import { RepositoryDetails } from '../../../../domain/repository-details';
import { UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css'],
  imports: [UpperCasePipe, TranslateModule],
})
export class RepoDetailsComponent {
  @Input() repo: RepositoryDetails;
}
