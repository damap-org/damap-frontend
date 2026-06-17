import { Component, Input } from '@angular/core';
import { Repository } from '../../../../domain/repository';
import { Dataset } from '../../../../domain/dataset';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-version-view-repositories',
  templateUrl: './version-view-repositories.component.html',
  styleUrls: [],
  imports: [TranslatePipe],
})
export class VersionViewRepositoriesComponent {
  @Input() repositories: Repository[];
  @Input() datasets: Dataset[];

  getDatasetsForRepository(repo: Repository): Dataset[] {
    return this.datasets?.filter(item =>
      repo.datasets.includes(item.referenceHash),
    );
  }
}
