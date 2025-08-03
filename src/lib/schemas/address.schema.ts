import { isValidPhoneNumber } from "react-phone-number-input";

import { z } from "zod";

export const addressSchema = z.object({
  addressType: z.enum(["1", "2", "3", "4"], {
    required_error: "You must select an address type.",
  }),
  title: z
    .string()
    .min(3, { message: "Title too short" })
    .max(50, { message: "Title too long" }),
  address: z.string().min(10, {
    message: "Please enter a more detailed address.",
  }),
  latitude: z.string({ required_error: "Please select location" }),
  longitude: z.string({ required_error: "Please select location" }),
  floor: z.string().optional(),
  landmark: z.string().optional(),
  pinCode: z.string().min(1, { message: "Please enter pin code" }).optional(),
  contact_no: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
