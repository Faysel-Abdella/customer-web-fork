"use server";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantResponce {
  list: Restaurant[];
}

interface ActionResult {
  data?: Restaurant[];
  error?: string;
}

export async function getRestaurants(
  queryString: string,
): Promise<ActionResult> {
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
    return { error: "Failed to update profile." };
  }
}
