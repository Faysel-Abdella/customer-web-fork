"use server";

import { fetchOnCondition, fetchWithAuth } from "@/lib/fetchWrappers";
import { LoginResponse, UserDetail } from "@/types/auth.types";
import { Category, MenuItem, Offer } from "@/types/restaurant.types";

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
  items: {
    list: MenuItem[];
  };
}

interface GetPopularDishesResult {
  data?: MenuItem[];
  error?: string;
}

export async function getPopularDishes(): Promise<GetPopularDishesResult> {
  try {
    const responseData: PopularDishesResponse =
      await fetchWithAuth<PopularDishesResponse>(`/api/cart-item/popular-dish`);

    return { data: responseData.items.list };
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
      ? `/api/offer/coupon-list?id=${id}`
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
  try {
    await fetchWithAuth(`/api/state/favourite?id=${id}&type=${typeId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add item to favorites" };
  }
}

interface CategoryItemsResponse {
  list: MenuItem[];
}

interface CategoryItemsResult {
  data?: MenuItem[];
  error?: string;
}

export async function getCategoryItems(
  id: string,
): Promise<CategoryItemsResult> {
  try {
    const responseData: CategoryItemsResponse =
      await fetchOnCondition<CategoryItemsResponse>(
        `/api/cart-item/items-by-category?category_id=${id}`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch category items." };
  }
}

interface CategoriesListResponse {
  list: Category[];
}

interface getCategoriesList {
  data?: Category[];
  error?: string;
}

export async function getCategiesList(): Promise<getCategoriesList> {
  try {
    const responseData: CategoriesListResponse =
      await fetchWithAuth<CategoriesListResponse>(
        `/api/restaurant/category-list`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch categories list." };
  }
}

interface ForgotPasswordPayload {
  User: {
    contact_no: string;
    country_code: string;
  };
}

interface ForgotPasswordResponse {
  message: string;
  detail: UserDetail;
}

interface ForgotPasswordResult {
  message?: string;
  detail?: UserDetail;
  error?: string;
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
      detail: responseData.detail,
      message: responseData.message,
    };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error: error };
    else return { error: "Failed to add item to favorites" };
  }
}
