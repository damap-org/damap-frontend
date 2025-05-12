import { Pipe, PipeTransform } from '@angular/core';

import { Contributor, compareContributors } from '../../../domain/contributor';

@Pipe({
  name: 'contributorFilter',
  standalone: false,
})
export class ContributorFilterPipe implements PipeTransform {
  transform(
    newContributors: Contributor[],
    alreadyAddedContributors: Contributor[],
  ): Contributor[] {
    return newContributors?.filter(
      entry =>
        // filter contributors that are already in the list based on universityId and personId
        alreadyAddedContributors.find(c => {
          return compareContributors(c, entry);
        }) === undefined,
    );
  }
}
