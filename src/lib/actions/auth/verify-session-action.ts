"use server";

import { cookies } from "next/headers";
import { redis } from "../../../../lib/redis";

export default async function verifyUserSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_id")?.value;

  const sessionInDb: {
    userId: string;
  } | null = await redis.get(sessionToken ?? "");

  return sessionInDb;
}
