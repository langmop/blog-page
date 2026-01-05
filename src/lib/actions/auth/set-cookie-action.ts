"use server";

import { cookies } from "next/headers";

export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60, // 10 minutes
  });
}
