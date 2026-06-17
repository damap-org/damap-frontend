import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Repository } from '../../../../domain/repository';
import { Dataset } from '../../../../domain/dataset';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-view-repositories',
  templateUrl: './version-view-repositories.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslatePipe],
})
export class VersionViewRepositoriesComponent {
  readonly repositories = input<Repository[]>(undefined);
  readonly datasets = input<Dataset[]>(undefined);

  getDatasetsForRepository(repo: Repository): Dataset[] {
    return this.datasets()?.filter(item =>
      repo.datasets.includes(item.referenceHash),
    );
  }
}
