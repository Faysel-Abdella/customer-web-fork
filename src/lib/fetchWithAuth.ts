import { cookies } from "next/headers";

import { processError } from "./utils";

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

export async function fetchWithAuth<T>(
  relativePath: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("access-token");

  if (!tokenCookie) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in your .env.local file.");
  }
  const fullUrl = new URL(relativePath, baseUrl).toString();

  const cleanToken = parseYii2Token(tokenCookie.value);

  if (!cleanToken) {
    throw new Error("Failed to parse authentication token from cookie.");
  }

  const headers = {
    Authorization: `Bearer ${cleanToken}`,
    ...options.headers,
  };
  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    const error = await processError(response);

    throw new Error(
      `API request failed with status ${response.status} and error: ${error}`,
    );
  }

  return response.json() as T;
}

export async function fetchWithoutAuth<T>(
  relativePath: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in your .env.local file.");
  }
  const fullUrl = new URL(relativePath, baseUrl).toString();

  const response = await fetch(fullUrl, {
    ...options,
  });

  if (!response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    const error = await processError(response);

    throw new Error(
      `API request failed with status ${response.status} and error: ${error}`,
    );
  }

  return response.json() as T;
}
