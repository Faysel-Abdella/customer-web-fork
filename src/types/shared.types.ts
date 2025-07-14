export interface PageData {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface ActionResult {
  success?: boolean;
  message?: string;
  error?: string;
}
