"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { LoginResponse } from "@/types/auth.types";

export async function updateProfileAction(data: FormData) {
  try {
    const responseData = await fetchWithAuth<LoginResponse>(
      "/api/user/profile-update",
      {
        method: "POST",

        body: data,
      },
    );

    return { data: responseData, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Failed to update profile." };
  }
}

export interface BannerItem {
  id: number;
  name: string;
  url: string;
}
interface BannerDataResponse {
  list: BannerItem[];
}

interface GetBannerItemsResult {
  data?: BannerItem[];
  error?: string;
}

export async function getBannerItems(): Promise<GetBannerItemsResult> {
  try {
    const responseData: BannerDataResponse =
      await fetchWithAuth<BannerDataResponse>(`/api/item-detail/banner-images`);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch banner items" };
  }
}

export async function getCategiesList(): Promise<GetBannerItemsResult> {
  try {
    const responseData: BannerDataResponse =
      await fetchWithAuth<BannerDataResponse>(`/api/item-detail/banner-images`);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch banner items" };
  }
}
