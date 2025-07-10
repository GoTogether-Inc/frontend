export interface ApiResponse<T> {
  status: number;
  message: string;
  result?: T;
}

export interface ApiErrorResponse {
  code?: string;
  message?: string;
  result?: Record<string, string>;
}
