"use server";

import { cookies } from "next/headers";

export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge:  +(process.env.SESSION_LIVE_AGE ?? 0), // 10 minutes
  });
}
