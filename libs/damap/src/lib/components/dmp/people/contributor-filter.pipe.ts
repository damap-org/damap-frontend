import { Contributor, compareContributors } from '../../../domain/contributor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contributorFilter',
  standalone: false,
})
export class ContributorFilterPipe implements PipeTransform {
  transform(
    newContributors: Contributor[],
    alreadyAddedContributors: Contributor[],
  ): Contributor[] {
    return this.filterContributors(newContributors, alreadyAddedContributors);
  }

  /**
   * filters out contributors that are already in the list.
   */
  filterContributors(
    newContributors: Contributor[],
    alreadyAddedContributors: Contributor[],
  ): Contributor[] {
    if (!newContributors || !alreadyAddedContributors) {
      return newContributors || [];
    }
    return newContributors.filter(
      entry =>
        alreadyAddedContributors.find(c => {
          return compareContributors(c, entry);
        }) === undefined,
    );
  }
}
