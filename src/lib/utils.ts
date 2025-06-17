import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
