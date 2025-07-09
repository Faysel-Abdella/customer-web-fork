"use server";
import { revalidatePath } from "next/cache";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  Address,
  FAQ,
  Message,
  Notification,
  Order,
  SentMessageRequestType as SendMessageRequestType,
} from "@/types/profile.types";
import { Restaurant } from "@/types/restaurant.types";

interface AddressActionResults {
  success: boolean;
  error?: string;
}

export async function addAddress(
  data: FormData,
): Promise<AddressActionResults> {
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

interface GetAddressListResult {
  data?: Address[];
  error?: string;
}

interface AddressListResponse {
  list: Address[];
}

export async function getAddressList(): Promise<GetAddressListResult> {
  try {
    const responseData: AddressListResponse =
      await fetchWithAuth<AddressListResponse>(
        `/api/address-management/address-list`,
        { method: "POST" },
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch address list" };
  }
}

export async function deleteAddress(id: string): Promise<AddressActionResults> {
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

export async function setDefaultAddress(
  id: string,
): Promise<AddressActionResults> {
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

interface GetOrdersListResults {
  data?: Order[];
  error?: string;
}

interface OrdersListResponse {
  list: Order[];
}

export async function getOrdersList(): Promise<GetOrdersListResults> {
  try {
    const responseData: OrdersListResponse =
      await fetchWithAuth<OrdersListResponse>(`/api/cart-item/order-history`);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch address list" };
  }
}

interface GetNotificationListResults {
  data?: Notification[];
  error?: string;
}

interface NotificationListResponse {
  list: Notification[];
}

export async function getNotificationList(): Promise<GetNotificationListResults> {
  try {
    const responseData: NotificationListResponse =
      await fetchWithAuth<NotificationListResponse>(
        `/api/user/notification-list`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch notication list" };
  }
}
interface GetFavoritesListResult {
  data?: { id: number; model_detail: Restaurant }[];
  error?: string;
}

interface FavoritesListResponse {
  list: { id: number; model_detail: Restaurant }[];
}

export async function getFavoritesList(): Promise<GetFavoritesListResult> {
  try {
    const responseData: FavoritesListResponse =
      await fetchWithAuth<FavoritesListResponse>(
        `/api/state/favourite-list?id=1`,
      );

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch favorites list" };
  }
}

interface GetFaqResults {
  data?: FAQ[];
  error?: string;
}

interface FaqListResponse {
  list: FAQ[];
}

export async function getFaqList(): Promise<GetFaqResults> {
  try {
    const responseData: FaqListResponse =
      await fetchWithAuth<FaqListResponse>(`/api/user/faq`);

    return { data: responseData.list };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch frequently asked questions." };
  }
}

interface SendMessageResults {
  success?: boolean;
  error?: string;
}

export async function sendMessage(
  data: SendMessageRequestType,
): Promise<SendMessageResults> {
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
    if (typeof error === "string") return { error };
    else return { error: "Failed to send message" };
  }
}

interface GetMessagesResult {
  data?: Message[];
  error?: string;
}

interface MessagesResponse {
  messages: Message[];
}

export async function getMessages(): Promise<GetMessagesResult> {
  try {
    const responseData: MessagesResponse =
      await fetchWithAuth<MessagesResponse>(`/api/user/history`);

    return { data: responseData.messages };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch messages." };
  }
}

interface ChangePasswordResult {
  success?: boolean;
  error?: string;
}

export async function changePassword(data: {
  User: { password: string; confirm_password: string };
}): Promise<ChangePasswordResult> {
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
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch messages." };
  }
}
