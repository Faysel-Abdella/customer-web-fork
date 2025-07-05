"use server";

import { fetchWithAuth, fetchWithoutAuth } from "@/lib/fetchWithAuth";
import { MenuItem, Offer, Restaurant } from "@/types/restaurant.types";

interface RestaurantResponce {
  list: Restaurant[];
}

interface GetRestaurantsResult {
  data?: Restaurant[];
  error?: string;
}

export async function getRestaurants(
  queryString: string,
): Promise<GetRestaurantsResult> {
  const url =
    queryString === ""
      ? "/api/restaurant/restaurant-list"
      : `/api/state/search-restaurant?${queryString}`;

  try {
    const responseData: RestaurantResponce =
      await fetchWithoutAuth<RestaurantResponce>(url);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch restaurants." };
  }
}
export async function getTopRestaurants(): Promise<GetRestaurantsResult> {
  try {
    const responseData: RestaurantResponce =
      await fetchWithoutAuth<RestaurantResponce>(
        "/api/restaurant/add-home-page",
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch restaurants." };
  }
}

interface RestaurantDetailResponce {
  detail: Restaurant;
}
interface GetRestaurantDetailsResult {
  data?: Restaurant;
  error?: string;
}

export async function getRestaurantDetails(
  restaurantId: string,
): Promise<GetRestaurantDetailsResult> {
  try {
    const responseData: RestaurantDetailResponce =
      await fetchWithoutAuth<RestaurantDetailResponce>(
        `/api/restaurant/restaurant-detail?id=${restaurantId}`,
      );

    return { data: responseData.detail };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch restaurant detail." };
  }
}

interface RestaurantMenuListResponse {
  list: MenuItem[];
}

interface GetRestaurantMenuListResults {
  data?: MenuItem[];
  error?: string;
}

export async function getRestaurantMenuList(
  restaurantId: string,
): Promise<GetRestaurantMenuListResults> {
  try {
    const responseData: RestaurantMenuListResponse =
      await fetchWithoutAuth<RestaurantMenuListResponse>(
        `/api/restaurant/menu-list?id=${restaurantId}`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch menu list." };
  }
}

interface MenuItemDetailResponse {
  detail: MenuItem;
}
interface GetMenuItemDetailResult {
  data?: MenuItem;
  error?: string;
}

export async function getMenuItemDetail(
  menuItemId: string,
): Promise<GetMenuItemDetailResult> {
  try {
    const responseData: MenuItemDetailResponse =
      await fetchWithoutAuth<MenuItemDetailResponse>(
        `/api/restaurant/item-detail?id=${menuItemId}`,
      );

    return { data: responseData.detail };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch menu item detail." };
  }
}

interface RestaurantOffersResponse {
  list: Offer[];
}

interface GetRestaurantOffers {
  data?: Offer[];
  error?: string;
}

export async function getRestaurantOffers(
  id: string,
): Promise<GetRestaurantOffers> {
  try {
    const responseData: RestaurantOffersResponse =
      await fetchWithAuth<RestaurantOffersResponse>(
        `/api/offer/coupon-list?id=${id}`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch restaurant offers." };
  }
}
