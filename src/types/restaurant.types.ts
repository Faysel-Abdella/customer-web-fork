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
