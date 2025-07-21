"use server";

import { cookies } from "next/headers";

import { isAuthenticated } from "@/lib/auth";
import { fetchWithAuth } from "@/lib/fetchWrappers";
import { ActionResult } from "@/types/shared.types";

export async function logoutAction(): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/user/logout`, {
      method: "POST",
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to delete item from cart" };
  }
}
export async function checkAuth() {
  return await isAuthenticated();
}

export async function clearTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
}
