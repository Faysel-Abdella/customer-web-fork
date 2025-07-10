"use server";

import { fetchWithAuth } from "@/lib/fetchWrappers";
import { CartItem } from "@/types/restaurant.types";

interface CartActionResults {
  success: boolean;
  error?: string;
}
export async function addToCartAction(
  data: FormData,
  clearCart: boolean = false,
): Promise<CartActionResults> {
  try {
    if (clearCart) {
      await fetchWithAuth("/api/cart/delete-cart");
    }

    await fetchWithAuth(`/api/cart/add-to-cart`, {
      method: "POST",
      body: data,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add to cart" };
  }
}
export async function deleteCartItem(id: string): Promise<CartActionResults> {
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
): Promise<CartActionResults> {
  try {
    await fetchWithAuth(`/api/cart/update-item?id=${id}&quantity=${quantity}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to update cart item" };
  }
}

interface GetCartItemsResult {
  data?: CartItem[];
  error?: string;
}

interface CartItemResponse {
  list: CartItem[];
}

export async function getCartItems(): Promise<GetCartItemsResult> {
  try {
    const responseData: CartItemResponse =
      await fetchWithAuth<CartItemResponse>(`/api/cart/my-cart-list`);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch cart items." };
  }
}

interface GetTotalCartPriceResult {
  data?: number;
  error?: string;
}

interface TotalCartPriceResponse {
  total_price: number;
}

export async function getTotalCartPrice(): Promise<GetTotalCartPriceResult> {
  try {
    const responseData: TotalCartPriceResponse =
      await fetchWithAuth<TotalCartPriceResponse>(`/api/cart/total-price`);

    return { data: responseData.total_price };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch total price" };
  }
}
