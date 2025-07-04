"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { LoginResponse } from "@/types/auth.types";
import { MenuItem, Offer } from "@/types/restaurant.types";

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

interface PlaceOrderResults {
  success: boolean;
  hesabPayLink?: string;
  error?: string;
}

interface PlaceOrderResponse {
  hesabPayLink?: string;
}

export async function placeOrder(data: FormData): Promise<PlaceOrderResults> {
  try {
    const responseData: PlaceOrderResponse =
      await fetchWithAuth<PlaceOrderResponse>(`/api/cart-item/place-order`, {
        method: "POST",
        body: data,
      });
    if (responseData.hesabPayLink) {
      return { success: true, hesabPayLink: responseData.hesabPayLink };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to create order" };
  }
}

interface PopularDishesResponse {
  items: MenuItem[];
}

interface GetPopularDishesResult {
  data?: MenuItem[];
  error?: string;
}

export async function getPopularDishes(): Promise<GetPopularDishesResult> {
  try {
    const responseData: PopularDishesResponse =
      await fetchWithAuth<PopularDishesResponse>(`/api/cart-item/popular-dish`);

    return { data: responseData.items };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch popular dishes list." };
  }
}
interface OffersListResponse {
  list: Offer[];
}

interface GetOffersListResult {
  data?: Offer[];
  error?: string;
}

export async function getOffersList(): Promise<GetOffersListResult> {
  try {
    const responseData: OffersListResponse =
      await fetchWithAuth<OffersListResponse>(`/api/offer/coupon-list`);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch offers list." };
  }
}
