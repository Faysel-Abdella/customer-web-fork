// HttpError.ts
export class HttpError extends Error {
  public readonly status: number;
  public readonly response: Response;

  constructor(response: Response, message?: string) {
    super(message || `HTTP Error: ${response.status} ${response.statusText}`);
    this.name = "HttpError";
    this.status = response.status;
    this.response = response;
  }
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}
