"use server";

import { fetchWithAuth } from "@/lib/fetchWrappers";
import {
  CartItemResponse,
  GetCartItemsResult,
  GetTotalCartPriceResult,
  TotalCartPriceResponse,
} from "@/types/restaurant.types";
import { ActionResult } from "@/types/shared.types";

export async function addToCartAction(
  data: object,
  clearCart: boolean = false,
): Promise<ActionResult> {
  const body = JSON.stringify(data);
  try {
    if (clearCart) {
      await fetchWithAuth("/api/cart/delete-cart");
    }

    await fetchWithAuth(`/api/cart/add-to-cart`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add to cart" };
  }
}
export async function deleteCartItem(id: string): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/cart/delete-cart?id=${id}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to delete item from cart" };
  }
}
export async function updateCartItem(
  id: string,
  quantity: string,
): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/cart/update-item?id=${id}&quantity=${quantity}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to update cart item" };
  }
}

export async function getCartItems(): Promise<GetCartItemsResult> {
  try {
    const responseData: CartItemResponse =
      await fetchWithAuth<CartItemResponse>(`/api/cart/my-cart-list`, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch cart items." };
  }
}

export async function getTotalCartPrice(): Promise<GetTotalCartPriceResult> {
  try {
    const responseData: TotalCartPriceResponse =
      await fetchWithAuth<TotalCartPriceResponse>(`/api/cart/total-price`, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.total_price };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch total price" };
  }
}
