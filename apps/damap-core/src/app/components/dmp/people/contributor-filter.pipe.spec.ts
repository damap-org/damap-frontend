import { describe, expect, it } from 'vitest';
import { compareContributors, Contributor } from '../../../domain/contributor';
import { mockContributor1, mockContributor2 } from '../../../mocks/contributor-mocks';
import { ContributorFilterPipe } from './contributor-filter.pipe';

describe('ContributorFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ContributorFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter already added contributors', () => {
    const pipe = new ContributorFilterPipe();
    const addedContributors = [mockContributor1];
    const contributorSearchResult = [mockContributor1, mockContributor2];

    const filteredContributors = pipe.transform(contributorSearchResult, addedContributors);
    expect(filteredContributors);
    expect(filteredContributors.length).toBe(1);
    expect(filteredContributors[0]).toBe(mockContributor2);
  });

  it('should compare contributors', () => {
    let c2 = mockContributor2;
    expect(compareContributors(c2, c2)).toBeTruthy();
    expect(compareContributors(null, c2)).toBeFalsy();
    expect(compareContributors(c2, null)).toBeFalsy();

    let c2NoUniversityID: Contributor = { ...c2, universityId: null };
    expect(compareContributors(c2NoUniversityID, c2NoUniversityID)).toBeTruthy();
  });
});
