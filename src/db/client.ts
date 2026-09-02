import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (cachedDb) {
    return cachedDb;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for database-backed operations.");
  }

  const sqlClient = neon(databaseUrl);
  cachedDb = drizzle(sqlClient, { schema });

  return cachedDb;
}

export function getOptionalDb() {
  try {
    return getDb();
  } catch {
    return null;
  }
}
