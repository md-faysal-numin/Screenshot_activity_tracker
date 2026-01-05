export interface ApiResponse<T = any> {
  message?: string;
  data: T;
  errors?: any[];
}

// export interface PaginationMeta {
//   total: number;
//   perPage: number;
//   currentPage: number;
//   lastPage: number;
// }
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: null | string;
    previousPageUrl: null | string;
  };
}
