import { HttpError } from "./HttpError";

// --- Type Definitions ---
interface ApiServiceConfig {
  baseUrl: string;
  headers?: HeadersInit;
}

//custom options type, allowing any object for the body
type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

interface ApiService {
  get: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
  post: <T>(
    endpoint: string,
    body: unknown,
    options?: RequestOptions
  ) => Promise<T>;
  put: <T>(
    endpoint: string,
    body: unknown,
    options?: RequestOptions
  ) => Promise<T>;
  delete: <T>(endpoint: string, options?: RequestOptions) => Promise<T>;
}

export function createApiService(config: ApiServiceConfig): ApiService {
  const { baseUrl, headers: defaultHeaders = {} } = config;
  console.log(config);

  const request = async <T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> => {
    const url = `${baseUrl}${endpoint}`;

    const { body, ...restOfOptions } = options;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...defaultHeaders,
      ...restOfOptions.headers,
    };

    // Create the final config using only RequestInit-compatible properties
    const config: RequestInit = {
      ...restOfOptions,
      headers,
    };

    // If the body exists, stringify it and add it to the config.
    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      console.log(response);
      throw new HttpError(response);
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json() as Promise<T>;
  };

  // Return the public API methods (this part remains the same)
  return {
    get: (endpoint, options) =>
      request(endpoint, { ...options, method: "GET" }),

    post: (endpoint, body, options) =>
      request(endpoint, { ...options, method: "POST", body }),

    put: (endpoint, body, options) =>
      request(endpoint, { ...options, method: "PUT", body }),

    delete: (endpoint, options) =>
      request(endpoint, { ...options, method: "DELETE" }),
  };
}
