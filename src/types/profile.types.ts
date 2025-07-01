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
