import { UserDetail } from "./auth.types";
import { Restaurant } from "./restaurant.types";

export type Address = {
  id: number;
  title: string;
  title_ps: string; // Assuming 'ps' and 'fs' might stand for specific language variants
  title_fs: string; // or specific display formats, given the same value as 'title'.
  description: string;
  address: string;
  latitude: string; // Often strings when coming from forms/APIs, can be parsed to number
  longitude: string; // Often strings when coming from forms/APIs, can be parsed to number
  is_default: number; // Could be boolean (0 or 1) depending on use
  pincode: string;
  state_id: number;
  type_id: number;
  created_on: string; // Date string
  created_by_id: number;
  contact_no: string;
  country_code: string;
};

export type OrderState = {
  id: number;
  order_id: number;
  state_id: number;
  description: string | null;
  created_on: string;
  created_by_id: number;
};

export type StoreFile = {
  id: number;
  name: string;
  size: number;
  key: string;
  url: string;
  model_type: string;
  model_id: number;
  project_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
};

// --- Main Order Type (Updated) ---
export type Order = {
  id: number;
  otp: number | null;
  verify_otp: number;
  order_no: string;
  dispatch_enable: number | null;
  order_type: number | null;
  is_rating: number;
  rating_detail: string;
  store_id: number;
  store_title: string;
  store_image: string;
  customer_address_id: string;
  customer_address_deatil: Address; // Nested type
  payable_amount: string; // "25.0" is a string
  tax: string;
  coupon_id: number;
  delivery_charge: string;
  discount_price: string;
  description: string | null;
  payment_status: number;
  total_price: string; // "15.0" is a string
  payment_type: number;
  state_id: number;
  updated_on: string | null;
  created_on: string;
  created_by_id: number;
  created_by_name: string;
  created_by_mobile_number: string;
  refund_reason: string | null;
  driver_id: number | null;
  driver_state: number | null;
  driver_latitude: string | null;
  driver_longitude: string | null;
  speed: number | null;
  initial_driver_latitude: string | null;
  initial_driver_longitude: string | null;
  rotation: number | null;
  // driver_deatil: any | null; // Specific type if known
  customer_detail: UserDetail; // Nested type
  invoice: string;
  restaurant_to_driver_distance: number | null; // Can be null
  distance: string; // "0 Km" is a string
  time: string; // "0 Min" is a string
  is_self_order: boolean;
  // item_detail: any[]; // Specific type if known
  orderState: OrderState[]; // Array of OrderState
  storeDetail: Restaurant;
};
