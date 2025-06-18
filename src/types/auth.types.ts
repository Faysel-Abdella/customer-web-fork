export type LoginPayload = {
  "LoginForm[username]": string;
  "LoginForm[country_code]": string;
  "LoginForm[password]": string;
  "LoginForm[role]": number;
  "LoginForm[device_type]": number;
  "LoginForm[device_token]": string;
  "LoginForm[device_udid]": string;
};

export type SignupPayload = {
  "User[first_name]": string;
  "User[last_name]": string;
  "User[password]": string;
  "User[country_code]": string;
  "User[contact_no]": string;
  "User[role_id]": string;
  confirm_password: string;
};
export type VerifyOtpPayload = {
  "User[otp]": string;
  "User[contact_no]": string;
  "User[country_code]": string;
};

type numericBool = 0 | 1;
export interface UserDetail {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string | null;
  contact_no: string;
  country_code: string;
  address: string | null;
  latitude: string;
  longitude: string;
  date_of_birth: string;
  gender: number;
  average_rating: number;
  total_trips: number;
  profile_file: string; // URL string
  license_file: string;
  government_id: string;
  business_proof: string;
  /** Note the typo in the key from the API */
  restrurant_id: string;
  merchant_id: number | null;
  bank_account_id: string | null;
  stripe_url: string | null;
  otp: number;
  is_online: numericBool;
  is_notify: numericBool;
  otp_verify: numericBool;
  is_added: numericBool;
  is_approve: numericBool;
  is_profile_setup: numericBool;
  is_social: boolean;
  is_default: number;
  role_id: number;
  state_id: number;
  type_id: number;
  unread_notification_count: string;
  created_on: string; // Datetime string
  viewPost: unknown[];
  document_file: unknown[];
}

export interface LoginResponse {
  message: string;
  "access-token": string;
  detail: UserDetail;
  datecheck: string;
  copyrights: string;
}
