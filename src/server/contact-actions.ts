"use server";

import { contactMessages } from "@/db/schema";
import { getOptionalDb } from "@/db/client";

type ContactField = "name" | "email" | "message";

export type ContactResult =
  | { status: "invalid"; errors: Partial<Record<ContactField, string>> }
  | { status: "success" }
  | { status: "unavailable" };

export async function createContactMessage(formData: FormData): Promise<ContactResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const errors: Partial<Record<ContactField, string>> = {};

  if (!name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Enter a message.";

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors };
  }

  const db = getOptionalDb();
  if (!db) return { status: "unavailable" };

  try {
    await db.insert(contactMessages).values({ name, email, message });
    return { status: "success" };
  } catch {
    return { status: "unavailable" };
  }
}
