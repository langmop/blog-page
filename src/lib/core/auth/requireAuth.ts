import { cookies } from "next/headers";
import { redis } from "../../../../lib/redis";
import { prisma } from "../../../../lib/db";
import logout from "@/lib/actions/auth/logout-action";

export async function requireAuth() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(process.env.SESSION_COOKIE_NAME!)?.value;
  if (!sessionId) {
    throw new Error("UNAUTHORIZED");
  }

  const {userId: rawUserId} = await redis.get(sessionId) as any;
  const userId = Number(rawUserId);
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    await logout();
    throw new Error("UNAUTHORIZED");
  }

  return user;
}
