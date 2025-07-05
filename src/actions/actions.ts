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
  payment_url?: string;
  error?: string;
}

interface PlaceOrderResponse {
  payment_url?: string;
}

export async function placeOrder(data: string): Promise<PlaceOrderResults> {
  try {
    const responseData: PlaceOrderResponse =
      await fetchWithAuth<PlaceOrderResponse>(`/api/cart-item/place-order`, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (responseData.payment_url) {
      return { success: true, payment_url: responseData.payment_url };
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

export async function getOffersList(id?: string): Promise<GetOffersListResult> {
  try {
    const url = id
      ? `/api/offer/coupon-list?restaurantId=${id}`
      : `/api/offer/coupon-list`;
    const responseData: OffersListResponse =
      await fetchWithAuth<OffersListResponse>(url);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch offers list." };
  }
}

interface AddToFavoritesResults {
  success: boolean;
  error?: string;
}

export async function addToFavorites(
  id: string,
  typeId: string,
): Promise<AddToFavoritesResults> {
  console.log("id:", id, "typeId:", typeId);
  try {
    await fetchWithAuth(`/api/state/favourite?id=${id}&type=${typeId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add item to favorites" };
  }
}
