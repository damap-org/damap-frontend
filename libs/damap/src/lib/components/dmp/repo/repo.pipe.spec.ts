import { Repository } from '../../../domain/repository';
import { RepositoryDetails } from '../../../domain/repository-details';
import { RepoPipe } from './repo.pipe';

describe('RepoPipe', () => {
  it('create an instance', () => {
    const pipe = new RepoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter already selected repositories', () => {
    const pipe = new RepoPipe();

    let repos: RepositoryDetails[] = [
      {
        id: '1',
        name: 'one',
      },
      {
        id: '2',
        name: 'two',
      },
    ];

    let selectedRepos: Repository[] = [
      {
        repositoryId: '1',
        id: 1,
        title: 'one',
      },
      {
        repositoryId: '3',
        id: 3,
        title: 'three ',
      },
    ];
    let filtered = pipe.transform(repos, selectedRepos);
    expect(filtered.length).toBe(1);
    expect(filtered.at(0)).toEqual({
      id: '2',
      name: 'two',
    });
  });
});
