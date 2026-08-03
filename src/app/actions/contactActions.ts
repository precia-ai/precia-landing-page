"use server";

import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function getClientIp(headersList: Headers): string {
  // Check common proxy headers first
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Rate limiting
    const headersList = await headers();
    const ip = getClientIp(headersList);
    const { limited, retryAfterMs } = rateLimit(
      `contact:${ip}`,
      5,
      60 * 1000 // 5 submissions per minute
    );

    if (limited) {
      const retryAfterSec = Math.ceil(retryAfterMs / 1000);
      return {
        success: false,
        message: `Too many submissions. Please try again in ${retryAfterSec} seconds.`,
      };
    }

    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      institution: formData.get("institution"),
      message: formData.get("message"),
    };

    const parsed = contactFormSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Please fix the errors below.",
        errors: fieldErrors as Record<string, string[]>,
      };
    }

    // Insert into database
    await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        institution: parsed.data.institution,
        message: parsed.data.message,
      },
    });

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
