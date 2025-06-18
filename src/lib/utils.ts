import { clsx, type ClassValue } from "clsx";
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

export async function processError(error: unknown) {
  try {
    if (error instanceof HttpError) {
      const errorResponse: { message: string } = await error.response
        .json()
        .catch(() => ({ message: "Failed to parse error response" }));
      return errorResponse.message;
    } else if (error instanceof Response) {
      // Fallback for direct Response errors (less common with HttpError)
      const errorResponse: { message: string } = await error
        .json()
        .catch(() => ({ message: "Failed to parse error response" }));
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
