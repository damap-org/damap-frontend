import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../../../../domain/repository-details';

@Component({
  selector: 'app-repo-recommendation',
  templateUrl: './repo-recommendation.component.html',
  styleUrls: ['./repo-recommendation.component.css'],
})
export class RepoRecommendationComponent {
  @Input() recommended: RepositoryDetails[];
  @Input() loaded: LoadingState;

  readonly LoadingState = LoadingState;

  @Output() repositoryToAdd = new EventEmitter<any>();

  addRepository(repo: RepositoryDetails) {
    this.repositoryToAdd.emit(repo);
  }
}
