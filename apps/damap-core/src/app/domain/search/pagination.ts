export interface Pagination {
  page: number;
  perPage: number;
  numPages?: number;
  numTotalItems?: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
