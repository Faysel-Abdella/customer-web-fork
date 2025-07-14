import { AdditionalItem, ItemPrice, MenuItem } from "./restaurant.types";

export interface CartItem {
  id: number;
  store_id: number;
  cart_id: number;
  product_id: number;
  store_type: number;
  price_id: number;
  selected_store_price: string;
  selected_rest_price: ItemPrice;
  quantity: number;
  total_price: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
  cart_type: number;
  restaurant_items: MenuItem[];
  additional_items: AdditionalItem[];
}
