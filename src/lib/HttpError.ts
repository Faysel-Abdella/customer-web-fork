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
