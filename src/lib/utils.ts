import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import { HttpError } from "./api/HttpError";

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
    formData.append(key, String(value));
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
