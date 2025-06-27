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

export type MenuImage = {
  id: number;
  name: string;
  size: number;
  key: string;
  url: string;
  model_type: string;
  model_id: number;
  project_id: number;
  type_id: number;
  created_on: string; // Date-time string, e.g., "2025-06-16 11:25:15"
  created_by_id: number;
};

export type MenuItem = {
  id: number;
  cart_item_id: string;
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
  out_of_stock: number; // Assuming 1 for true, 0 for false.
  state_id: number;
  type_id: number;
  created_on: string; // Date-time string, e.g., "2025-06-16 11:25:15"
  created_by_id: number;
  item_count: number;
  is_favourite: number; // Assuming 1 for true, 0 for false.
  is_added_in_cart: boolean | null;
  avg_rating: number;
  is_ordered: boolean;
  count: number | null;
  menuImages: MenuImage[];
  itemPrice: ItemPrice[];
};
