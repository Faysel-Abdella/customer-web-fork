interface Availability {
  id: number;
  day_id: number;
  resturant_id: number;
  start_time: string;
  end_time: string;
  is_default: number;
}

interface File {
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
}

export interface Restaurant {
  id: number;
  title: string;
  created_by_owner_name: string;
  created_by_first_name: string;
  created_by_last_name: string;
  created_by_email: string;
  fee: string;
  location: string;
  latitude: string;
  longitude: string;
  description: string;
  image_file: string;
  is_default: number;
  state_id: number;
  type_id: number;
  created_on: string;
  contact_no: string;
  created_by_id: number;
  created_by_number: string;
  average_rating: number;
  estimated_delivery_fees: number;
  estimated_delivery_distance: string;
  estimated_delivery_time: string;
  price_per_person: string;
  is_favourite: number;
  availability: Availability[];
  files: File[];
}

export type ItemPrice = {
  id: number;
  title: string;
  price: string;
  quantity: string;
  item_id: number;
  state_id: number;
  type_id: number;
  created_on: string; // Date-time string, e.g., "2025-06-16 11:25:15"
  created_by_id: number;
};

interface MenuImage {
  id: number;
  name: string;
  size: number;
  key: string;
  url: string;
  model_type: string;
  model_id: number;
  project_id: number;
  type_id: number;
  created_on: string; // ISO date string
  created_by_id: number;
}

// Type for the nested add_on_category_id object
interface AddOnCategory {
  id: number;
  title: string;
  image: string;
  state_id: number;
  type_id: number;
  created_on: string; // ISO date string
  created_by_id: number;
}

// Type for a single add-on in the addOnsList array
export interface AddOn {
  id: number;
  title: string;
  price: string;
  limit: number;
  item_id: number;
  state_id: number;
  add_on_category_id: AddOnCategory;
  type_id: number;
  created_on: string; // ISO date string
  created_by_id: number;
}

// The main type for the entire menu item response
export interface MenuItem {
  id: number;
  cart_item_id: string;
  title: string;
  cuisine_type: number;
  quantity: number;
  cuisine_type_name: string;
  item_type: number;
  restaurant_id: number;
  image_file: string; // URL
  category_id: number;
  price: string;
  customized_price: string;
  description: string;
  is_available: number; // 0 or 1, can be treated as boolean
  cook_time: string;
  start_time: string; // ISO date string
  end_time: string; // ISO date string
  preparation_time: string;
  out_of_stock: number; // 0 or 1, can be treated as boolean
  state_id: number;
  type_id: number;
  created_on: string; // ISO date string
  created_by_id: number;
  item_count: number;
  is_favourite: number; // 0 or 1, can be treated as boolean
  is_added_in_cart: number; // Type can be refined if non-null examples are available
  avg_rating: number;
  is_ordered: boolean;
  count: null | number;
  menuImages: MenuImage[];
  addOnsList: AddOn[];
  itemPrice: ItemPrice[];
  availability: Availability[];
}

export type AddToCartRequest = {
  "Cart[store_id]": string;
  "Cart[type_id]": string;
  "CartItem[product_id]": string;
  "CartItem[price_id]": string;
  "CartItem[quantity]": string;
};

export type RestaurantItem = {
  id: number;
  title: string;
  cuisine_type: number;
  quantity: number | null;
  cuisine_type_name: string;
  item_type: number;
  restaurant_id: number;
  image_file: string;
  category_id: number;
  price: string;
  customized_price: number | null;
  description: string;
  is_available: number;
  cook_time: string;
  start_time: string;
  end_time: string;
  preparation_time: string;
  out_of_stock: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
  item_count: number;
  is_favourite: number;
  is_added_in_cart: number | null;
  avg_rating: number;
  is_ordered: boolean;
  menuImages: MenuImage[];
  itemPrice: ItemPrice[];
};

export type CartItem = {
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
  created_on: string; // Date-time string, e.g., "2025-06-27 16:53:50"
  created_by_id: number;
  cart_type: number;
  restaurant_items: RestaurantItem[];
  // Type is unknown as it's an empty array
};
