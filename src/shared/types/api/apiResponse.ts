export interface ApiResponse<T> {
  status: number;
  message: string;
  result?: T;
}

export interface ApiErrorResponse {
  message?: string;
}
