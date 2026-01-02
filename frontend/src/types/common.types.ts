export interface ApiResponse<T = any> {
  message?: string;
  data: T;
  errors?: any[];
}

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}
