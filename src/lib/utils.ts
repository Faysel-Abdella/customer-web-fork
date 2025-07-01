import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import { HttpError } from "./HttpError";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const objectToUrlEncoded = (data: object): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    params.append(key, String(value));
  }

  return params;
};

export const objectToFormData = (data: object): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
};
export async function processError(error: unknown) {
  try {
    if (error instanceof HttpError) {
      const errorResponse: { message: string } = await error.response
        .json()
        .catch(() => ({ message: "Something went wrong" }));
      console.log("Error details: ", errorResponse);
      return errorResponse.message;
    } else if (error instanceof Response) {
      // Fallback for direct Response errors (less common with HttpError)
      const errorResponse: { message: string } = await error
        .json()
        .catch(() => ({ message: "Something went wrong" }));
      return errorResponse.message;
    } else if (error instanceof Error) {
      // Catch standard JavaScript errors (e.g., network issues)
      return error.message || "An unexpected error occurred.";
    } else {
      console.log("Error details: ", error);
      return "Unknown error occurred.";
    }
  } catch (innerError) {
    console.error("Error processing error:", innerError); // Log the inner error
    return "An internal error occurred.";
  }
}

export function formatYYYYMMDD(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function buildUrlSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams {
  const params = new URLSearchParams();

  // Iterate over each key in the searchParams object
  for (const [key, value] of Object.entries(searchParams)) {
    // 1. If the value is a string, append it.
    if (typeof value === "string") {
      params.append(key, value);
    }
    // 2. If the value is an array, iterate and append each item.
    // This correctly handles cases like ?category=a&category=b
    else if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    }
    // 3. If the value is undefined, it will be skipped, which is the desired behavior.
  }

  return params;
}
