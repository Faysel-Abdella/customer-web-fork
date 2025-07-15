import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ApiError } from "./HttpError";
import { processError } from "./utils";

export interface FetchOptions extends RequestInit {
  retry?: {
    retries?: number;
    delay?: number;
  };
}

function parseYii2Token(cookieValue: string): string | null {
  try {
    const match = cookieValue.match(/i:1;s:\d+:"([^"]+)"/);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  } catch (e) {
    console.error("Failed to parse cookie value", e);
    return null;
  }
}

async function getAuthHeader(): Promise<HeadersInit | undefined> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("access-token");

  if (!tokenCookie?.value) {
    return undefined;
  }

  const cleanToken = parseYii2Token(tokenCookie.value);
  if (!cleanToken) {
    console.warn("Could not parse authentication token from cookie.");
    return undefined;
  }

  return {
    Authorization: `Bearer ${cleanToken}`,
  };
}

type AuthRequirement = "required" | "optional";

async function baseFetch<T>(
  relativePath: string,
  authRequirement: AuthRequirement,
  options: FetchOptions = {},
): Promise<T> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in your .env.local file.");
  }

  const authHeader = await getAuthHeader();

  if (authRequirement === "required" && !authHeader) {
    console.log("Authentication token not found. Please log in.");
    redirect("/login");
  }

  const headers = {
    ...authHeader,
    ...options.headers,
  };

  const fullUrl = new URL(relativePath, baseUrl).toString();
  const shouldRetry = !!options.retry;

  const response = shouldRetry
    ? await fetchWithRetry(fullUrl, { ...options, headers }, options.retry)
    : await fetch(fullUrl, { ...options, headers });

  if (!response.ok) {
    let errorPayload: unknown = null;
    try {
      errorPayload = await response.json();
    } catch {}
    const errorMessage = await processError(response);
    throw new ApiError(
      `API request failed: ${errorMessage}`,
      response.status,
      errorPayload,
    );
  }

  return response.json() as T;
}

const retriableErrorCodes = [500, 502, 503, 504];
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: { retries?: number; delay?: number } = {},
): Promise<Response> {
  const { retries = 3, delay = 1000 } = retryOptions;
  let attempt = 1;

  while (attempt <= retries) {
    try {
      const response = await fetch(url, options);

      if (response.ok || !retriableErrorCodes.includes(response.status)) {
        return response;
      }
      // Throw an error to be caught by the catch block and trigger a retry
      throw new Error(`Retryable error status: ${response.status}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (attempt === retries) {
        throw new Error(
          `All ${retries} attempts failed. Last error: ${errorMessage}`,
        );
      }
      console.log(
        `Attempt ${attempt} failed: ${errorMessage}. Retrying in ${delay / 1000}s...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }
  // This line should be unreachable, but it satisfies TypeScript's need for a return path.
  throw new Error("Exited retry loop unexpectedly.");
}

export function fetchWithAuth<T>(
  relativePath: string,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(relativePath, "required", options);
}

export function fetchOnCondition<T>(
  relativePath: string,
  options: FetchOptions = {},
): Promise<T> {
  return baseFetch<T>(relativePath, "optional", options);
}
