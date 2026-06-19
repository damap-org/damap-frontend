import { Search } from './search';

export interface SearchResult<T> {
  search: Search;
  items: T[];
}
