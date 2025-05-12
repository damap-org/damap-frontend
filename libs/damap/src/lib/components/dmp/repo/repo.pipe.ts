import { Pipe, PipeTransform } from '@angular/core';
import { RepositoryDetails } from '../../../domain/repository-details';
import { Repository } from '../../../domain/repository';

@Pipe({
  name: 'repo',
  standalone: false,
})
export class RepoPipe implements PipeTransform {
  transform(
    repos: RepositoryDetails[],
    selected: Repository[],
  ): RepositoryDetails[] {
    return repos.filter(
      (e: RepositoryDetails) =>
        selected.find((entry: Repository) => entry.repositoryId === e.id) ===
        undefined,
    );
  }
}
