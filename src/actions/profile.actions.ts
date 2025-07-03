"use server";
import { revalidatePath } from "next/cache";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Address, Notification, Order } from "@/types/profile.types";

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

const sampleNotifications: Notification[] = [
  {
    id: 1,
    title: "Order Shipped",
    description:
      "Great news! Your recent order, reference number #ORD-002, containing your selected items, has been successfully shipped from our warehouse. You can expect delivery within 3-5 business days. Track its progress using the link in your order confirmation email.",
    modelId: 2,
    modelType: "Order",
    isRead: false,
    stateId: 1,
    typeId: 101,
    createdOn: "2024-01-15T10:30:00Z",
    toUserId: 123,
    createdById: 999,
    fullName: "System Notifications",
    imageFile: null,
  },
  {
    id: 2,
    title: "Security Alert",
    description:
      "For your account's security, we've detected a new login to your account from a Chrome browser on a Windows device, originating from New York, NY, at approximately 3:45 PM EDT. If this was you, no action is needed. If not, please review your account activity and change your password immediately.",
    modelId: 456,
    modelType: "SecurityEvent",
    isRead: false,
    stateId: 1,
    typeId: 201,
    createdOn: "2024-01-14T15:45:00Z",
    toUserId: 123,
    createdById: 999,
    fullName: "Security System",
    imageFile: null,
  },
  {
    id: 3,
    title: "Payment Successful",
    description:
      "Your recent payment of $156.50 for order #ORD-002, placed on January 13th, has been processed and confirmed. Your transaction is complete, and a detailed receipt has been sent to your registered email address for your records.",
    modelId: 3,
    modelType: "Payment",
    isRead: true,
    stateId: 2,
    typeId: 102,
    createdOn: "2024-01-14T09:20:00Z",
    toUserId: 123,
    createdById: 999,
    fullName: "Payment Processor",
    imageFile: null,
  },
  {
    id: 4,
    title: "Profile Updated",
    description:
      "Your profile information, including your shipping address and contact details, has been successfully updated on our system. Please review your profile settings to ensure all changes are accurate. If you did not make these changes, please contact support immediately.",
    modelId: 123,
    modelType: "UserAccount",
    isRead: true,
    stateId: 2,
    typeId: 301,
    createdOn: "2024-01-13T14:15:00Z",
    toUserId: 123,
    createdById: 123,
    fullName: "Your Account",
    imageFile: null,
  },
  {
    id: 5,
    title: "Special Offer",
    description:
      "Don't miss out! We're giving you an exclusive 20% discount on your next purchase across our entire product range. This offer is valid for a limited time. Simply use the code SAVE20 at checkout to redeem your savings!",
    modelId: null,
    modelType: null,
    isRead: true,
    stateId: 2,
    typeId: 401,
    createdOn: "2024-01-12T11:00:00Z",
    toUserId: 123,
    createdById: 998,
    fullName: "Marketing Team",
    imageFile: "promo_banner.jpg",
  },
  {
    id: 6,
    title: "Order Delivered",
    description:
      "Good news! Your order #ORD-001 has been successfully delivered to your specified address. We hope you enjoy your new items! If you have any feedback or require assistance, please don't hesitate to reach out to our customer support team.",
    modelId: 1,
    modelType: "Order",
    isRead: true,
    stateId: 2,
    typeId: 101,
    createdOn: "2024-01-11T16:30:00Z",
    toUserId: 123,
    createdById: 999,
    fullName: "Delivery Service",
    imageFile: null,
  },
];

export async function getNotificationList(): Promise<GetNotificationListResults> {
  try {
    const responseData: NotificationListResponse =
      await fetchWithAuth<NotificationListResponse>(
        `/api/user/notification-list`,
      );

    return { data: sampleNotifications };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { error };
    else return { error: "Failed to fetch notication list" };
  }
}
