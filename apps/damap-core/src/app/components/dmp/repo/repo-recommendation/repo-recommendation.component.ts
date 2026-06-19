import { Component, Input, ChangeDetectionStrategy, input, output } from '@angular/core';

import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../../../../domain/repository-details';
import { MatCard, MatCardHeader, MatCardTitle, MatCardActions } from '@angular/material/card';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';
import { MatButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ErrorMessageComponent } from '../../../../widgets/error-message/error-message.component';

@Component({
  selector: 'app-repo-recommendation',
  templateUrl: './repo-recommendation.component.html',
  styleUrls: ['./repo-recommendation.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    RepoDetailsComponent,
    MatCardActions,
    MatButton,
    TranslatePipe,
    TranslateDirective,
    MatProgressBar,
    ErrorMessageComponent,
  ],
})
export class RepoRecommendationComponent {
  @Input() recommended: RepositoryDetails[];
  readonly loaded = input<LoadingState>(undefined);

  readonly LoadingState = LoadingState;

  readonly repositoryToAdd = output<any>();

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }
}
