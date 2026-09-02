"use server";

import { revalidatePath } from "next/cache";
import { contactMessages } from "@/db/schema";
import { getOptionalDb } from "@/db/client";

export async function createContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return;
  }

  const db = getOptionalDb();

  if (!db) {
    return;
  }

  await db.insert(contactMessages).values({
    name,
    email,
    message
  });

  revalidatePath("/");
}
