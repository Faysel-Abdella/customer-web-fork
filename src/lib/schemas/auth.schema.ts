// lib/schemas/auth.schema.ts
import { isValidPhoneNumber } from "react-phone-number-input";

import { z } from "zod";

export const loginSchema = z.object({
  contact_no: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .refine(isValidPhoneNumber, {
      message: "Invalid phone number",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    contact_no: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .refine(isValidPhoneNumber, {
        message: "Invalid phone number",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  contact_no: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .refine(isValidPhoneNumber, {
      message: "Invalid phone number",
    }),
});
export const oTPSchema = z.object({
  code: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export const profileSetupSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  contact_no: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .refine(isValidPhoneNumber, {
      message: "Invalid phone number",
    }),
  gender: z.string(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});
