"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { MenuItem, Restaurant } from "@/types/restaurant.types";

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
      await fetchWithAuth<RestaurantResponce>(url);

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
      await fetchWithAuth<RestaurantDetailResponce>(
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
      await fetchWithAuth<RestaurantMenuListResponse>(
        `/api/restaurant/menu-list?id=${restaurantId}`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch menu list." };
  }
}
