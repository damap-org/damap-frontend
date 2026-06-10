import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoadingState } from '../../../../domain/enum/loading-state.enum';
import { RepositoryDetails } from '../../../../domain/repository-details';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardActions,
} from '@angular/material/card';
import { RepoDetailsComponent } from '../repo-details/repo-details.component';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ErrorMessageComponent } from '../../../../widgets/error-message/error-message.component';
import { TranslatePipeMock } from '../../../../testing/translate-testing/translate-testing.module';

@Component({
  selector: 'app-repo-recommendation',
  templateUrl: './repo-recommendation.component.html',
  styleUrls: ['./repo-recommendation.component.css'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    RepoDetailsComponent,
    MatCardActions,
    MatButton,
    TranslateModule,
    MatProgressBar,
    ErrorMessageComponent,
    TranslatePipeMock,
  ],
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
