"use server";

import { cookies } from "next/headers";
import { redis } from "../../../../lib/redis";

export default async function verifyUserSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(process?.env?.SESSION_COOKIE_NAME ?? "")?.value;

  const sessionInDb: {
    userId: string;
  } | null = await redis.get(sessionToken ?? "");

  return sessionInDb;
}
