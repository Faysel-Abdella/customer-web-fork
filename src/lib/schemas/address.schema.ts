import { isValidPhoneNumber } from "react-phone-number-input";

import { z } from "zod";

export const addressSchema = z.object({
  addressType: z.enum(["Home", "Office", "Hotel", "Other"], {
    required_error: "You must select an address type.",
  }),
  houseAddress: z.string().min(10, {
    message: "Please enter a more detailed address.",
  }),
  floor: z.string().optional(),
  landmark: z.string().optional(),
  pinCode: z.string().optional(),
  mobileNumber: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
