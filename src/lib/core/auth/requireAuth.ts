import { cookies } from "next/headers";
import { redis } from "../../../../lib/redis";
import { prisma } from "../../../../lib/db";

export async function requireAuth() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(process.env.SESSION_COOKIE_NAME!)?.value;

  if (!sessionId) {
    throw new Error("UNAUTHORIZED");
  }

  const rawUserId = await redis.get(sessionId);
  const userId = Number(rawUserId);

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}
