"use server";
import { revalidatePath } from "next/cache";

import { fetchWithAuth } from "@/lib/fetchWrappers";
import {
  AddressListResponse,
  FaqListResponse,
  FavoritesListResponse,
  GetAddressListResult,
  GetFaqResults,
  GetFavoritesListResult,
  GetMessagesResult,
  GetNotificationListResults,
  GetOrdersListResults,
  MessagesResponse,
  NotificationListResponse,
  OrdersListResponse,
  SentMessageRequestType as SendMessageRequestType,
} from "@/types/profile.types";
import { ActionResult } from "@/types/shared.types";

export async function addAddress(data: FormData): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/address-management/add-address`, {
      method: "POST",

      body: data,
    });
    revalidatePath("/profile/addresses");

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add address" };
  }
}

export async function getAddressList(): Promise<GetAddressListResult> {
  try {
    const responseData: AddressListResponse =
      await fetchWithAuth<AddressListResponse>(
        `/api/address-management/address-list`,
        { method: "POST" },
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch address list" };
  }
}

export async function deleteAddress(id: string): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/address-management/delete-address?id=${id}`);
    revalidatePath("/profile/addresses");

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to delete address" };
  }
}

export async function setDefaultAddress(id: string): Promise<ActionResult> {
  try {
    await fetchWithAuth(
      `/api/address-management/default-address?address_id=${id}`,
    );
    revalidatePath("/profile/addresses");

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to delete address" };
  }
}

export async function getOrdersList(): Promise<GetOrdersListResults> {
  try {
    const responseData: OrdersListResponse =
      await fetchWithAuth<OrdersListResponse>(`/api/cart-item/order-history`);

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch address list" };
  }
}

export async function getNotificationList(): Promise<GetNotificationListResults> {
  try {
    const responseData: NotificationListResponse =
      await fetchWithAuth<NotificationListResponse>(
        `/api/user/notification-list`,
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch notication list" };
  }
}
export async function getFavoritesList(): Promise<GetFavoritesListResult> {
  try {
    const responseData: FavoritesListResponse =
      await fetchWithAuth<FavoritesListResponse>(
        `/api/state/favourite-list?id=1`,
      );

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch favorites list" };
  }
}

export async function getFaqList(): Promise<GetFaqResults> {
  try {
    const responseData: FaqListResponse =
      await fetchWithAuth<FaqListResponse>(`/api/user/faq`);

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else
      return {
        success: false,
        error: "Failed to fetch frequently asked questions.",
      };
  }
}

export async function sendMessage(
  data: SendMessageRequestType,
): Promise<ActionResult> {
  try {
    const body = JSON.stringify(data);

    await fetchWithAuth(`/api/user/send`, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to send message" };
  }
}

export async function getMessages(): Promise<GetMessagesResult> {
  try {
    const responseData: MessagesResponse =
      await fetchWithAuth<MessagesResponse>(`/api/user/history`);

    return { success: true, data: responseData.messages };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch messages." };
  }
}

export async function changePassword(data: {
  User: { password: string; confirm_password: string };
}): Promise<ActionResult> {
  const body = JSON.stringify(data);
  try {
    await fetchWithAuth("/api/user/change-password", {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: true, error };
    else return { success: false, error: "Failed to fetch messages." };
  }
}
