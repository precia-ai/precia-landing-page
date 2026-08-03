import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must not exceed 200 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(320, "Email must not exceed 320 characters"),
  institution: z
    .string()
    .trim()
    .min(2, "Institution must be at least 2 characters")
    .max(300, "Institution must not exceed 300 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must not exceed 5000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
