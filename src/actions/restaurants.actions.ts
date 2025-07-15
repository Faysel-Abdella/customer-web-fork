"use server";

import { fetchOnCondition, fetchWithAuth } from "@/lib/fetchWrappers";
import {
  GetMenuItemDetailResult,
  GetRestaurantDetailsResult,
  GetRestaurantMenuListResults,
  GetRestaurantOffersResult,
  GetRestaurantReviewsResult,
  GetRestaurantsResult,
  MenuItemDetailResponse,
  RestaurantDetailResponce,
  RestaurantMenuListResponse,
  RestaurantOffersResponse,
  RestaurantResponce,
  Reviews,
} from "@/types/restaurant.types";

export async function getRestaurants(
  queryString: string,
): Promise<GetRestaurantsResult> {
  const url =
    queryString === ""
      ? "/api/restaurant/restaurant-list"
      : `/api/state/search-restaurant?${queryString}`;

  try {
    const responseData: RestaurantResponce =
      await fetchOnCondition<RestaurantResponce>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return {
      success: true,
      data: responseData.list,
      pageData: responseData._meta,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch restaurants." };
  }
}
export async function getTopRestaurants(): Promise<GetRestaurantsResult> {
  try {
    const responseData: RestaurantResponce =
      await fetchOnCondition<RestaurantResponce>(
        "/api/restaurant/add-home-page",
        {
          retry: { retries: 3, delay: 1000 },
        },
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch restaurants." };
  }
}

export async function getRestaurantDetails(
  restaurantId: string,
): Promise<GetRestaurantDetailsResult> {
  try {
    const responseData: RestaurantDetailResponce =
      await fetchOnCondition<RestaurantDetailResponce>(
        `/api/restaurant/restaurant-detail?id=${restaurantId}`,
        {
          retry: { retries: 3, delay: 1000 },
        },
      );

    return { success: true, data: responseData.detail };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch restaurant detail." };
  }
}

export async function getRestaurantMenuList(
  restaurantId: string,
): Promise<GetRestaurantMenuListResults> {
  try {
    const responseData: RestaurantMenuListResponse =
      await fetchOnCondition<RestaurantMenuListResponse>(
        `/api/restaurant/menu-list?id=${restaurantId}`,
        {
          retry: { retries: 3, delay: 1000 },
        },
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch menu list." };
  }
}

export async function getMenuItemDetail(
  menuItemId: string,
): Promise<GetMenuItemDetailResult> {
  try {
    const responseData: MenuItemDetailResponse =
      await fetchOnCondition<MenuItemDetailResponse>(
        `/api/restaurant/item-detail?id=${menuItemId}`,
        {
          retry: { retries: 3, delay: 1000 },
        },
      );

    return { success: true, data: responseData.detail };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch menu item detail." };
  }
}

export async function getRestaurantOffers(
  id: string,
): Promise<GetRestaurantOffersResult> {
  try {
    const responseData: RestaurantOffersResponse =
      await fetchWithAuth<RestaurantOffersResponse>(
        `/api/offer/coupon-list?id=${id}`,
        {
          retry: { retries: 3, delay: 1000 },
        },
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch restaurant offers." };
  }
}
export async function getRestaurantReviews(
  id: string,
): Promise<GetRestaurantReviewsResult> {
  try {
    const responseData: Reviews = await fetchWithAuth<Reviews>(
      `/api/rating/rating-list?id=${id}`,
      {
        retry: { retries: 3, delay: 1000 },
      },
    );

    return { success: true, data: responseData };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch restaurant offers." };
  }
}
