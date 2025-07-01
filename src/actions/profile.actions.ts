"use server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

interface AddAddressResults {
  success: boolean;
  error?: string;
}

export async function addAddress(data: FormData): Promise<AddAddressResults> {
  try {
    await fetchWithAuth(`/api/address-management/add-address`, {
      method: "POST",

      body: data,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add address" };
  }
}
