"use server";

import { fetchOnCondition, fetchWithAuth } from "@/lib/fetchWrappers";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ForgotPasswordResult,
  LoginResponse,
} from "@/types/auth.types";
import {
  BannerDataResponse,
  CategoriesListResponse,
  CategoryItemsResponse,
  CategoryItemsResult,
  GetBannerItemsResult,
  getCategoriesList,
  GetOffersListResult,
  GetPopularDishesResult,
  OffersListResponse,
  PlaceOrderResponse,
  PlaceOrderResults,
  PopularDishesResponse,
} from "@/types/restaurant.types";
import { ActionResult } from "@/types/shared.types";

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

export async function getBannerItems(): Promise<GetBannerItemsResult> {
  try {
    const responseData: BannerDataResponse =
      await fetchWithAuth<BannerDataResponse>(`/api/cart-item/banners`);
    return { success: true, data: responseData.banners };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch banner items" };
  }
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

export async function getPopularDishes(): Promise<GetPopularDishesResult> {
  try {
    const responseData: PopularDishesResponse =
      await fetchWithAuth<PopularDishesResponse>(`/api/cart-item/popular-dish`);

    return { success: true, data: responseData.items.list };
  } catch (error) {
    console.error(error);
    return { success: true, error: "Failed to fetch popular dishes list." };
  }
}

export async function getOffersList(id?: string): Promise<GetOffersListResult> {
  try {
    const url = id
      ? `/api/offer/coupon-list?id=${id}`
      : `/api/offer/coupon-list`;
    const responseData: OffersListResponse =
      await fetchWithAuth<OffersListResponse>(url);

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: true, error: "Failed to fetch offers list." };
  }
}

export async function addToFavorites(
  id: string,
  typeId: string,
): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/state/favourite?id=${id}&type=${typeId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add item to favorites" };
  }
}

export async function getCategoryItems(
  id: string,
): Promise<CategoryItemsResult> {
  try {
    const responseData: CategoryItemsResponse =
      await fetchOnCondition<CategoryItemsResponse>(
        `/api/cart-item/items-by-category?category_id=${id}`,
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch category items." };
  }
}

export async function getCategiesList(): Promise<getCategoriesList> {
  try {
    const responseData: CategoriesListResponse =
      await fetchWithAuth<CategoriesListResponse>(
        `/api/restaurant/category-list`,
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch categories list." };
  }
}

export async function forgotPassword(
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordResult> {
  const body = JSON.stringify(data);
  try {
    const responseData = await fetchOnCondition<ForgotPasswordResponse>(
      "/api/user/forgot-password",
      {
        method: "POST",

        body,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      succes: true,
      detail: responseData.detail,
      message: responseData.message,
    };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error: error };
    else return { error: "Failed to add item to favorites" };
  }
}
