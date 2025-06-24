import { z } from "zod";

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string().min(50, { message: "Message too short" }),
});
