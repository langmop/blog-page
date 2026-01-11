"use server";

import { cookies } from "next/headers";
import { redis } from "../../../../lib/redis";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(process?.env?.SESSION_COOKIE_NAME ?? "");
  await redis.del(sessionId?.value ?? "");
  cookieStore.delete(process?.env?.SESSION_COOKIE_NAME ?? "");
  redirect("/admin");
}
