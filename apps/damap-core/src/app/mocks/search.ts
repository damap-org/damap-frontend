import { mockProject, mockRecommendedProject } from './project-mocks';

import { Contributor } from '../domain/contributor';
import { Pagination } from '../domain/search/pagination';
import { Project } from '../domain/project';
import { Search } from '../domain/search/search';
import { SearchResult } from '../domain/search/search-result';
import { mockContact } from './contributor-mocks';

export const mockPagination: Pagination = {
  page: 1,
  perPage: 10,
  hasNext: false,
  hasPrevious: false,
};

export const mockSearch: Search = {
  pagination: mockPagination,
  query: '',
};

export const mockRecommendedProjectSearchResult: SearchResult<Project> = {
  items: [mockRecommendedProject],
  search: mockSearch,
};

export const mockContributorSearchResult: SearchResult<Contributor> = {
  search: mockSearch,
  items: [mockContact],
};

export const mockProjectSearchResult: SearchResult<Project> = {
  items: [mockProject],
  search: mockSearch,
};
