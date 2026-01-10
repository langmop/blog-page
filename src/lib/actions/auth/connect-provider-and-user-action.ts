import { prisma } from "../../../../lib/db";
import crypto from "crypto";
import { redis } from "../../../../lib/redis";
import { setSessionCookie } from "./set-cookie-action";
import { AuthType } from "@/generated/prisma/enums";

export async function connectUser({
  id,
  email,
  name,
  provider,
}: {
  id: string;
  email: string;
  name: string;
  provider: AuthType;
}) {
  await prisma.$transaction(async (tx) => {
    const sessionId = crypto.randomBytes(32).toString("hex");
    let user = await tx.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await tx.user.create({
        data: { email, name },
      });
    }

    await tx.authProvider.upsert({
      where: {
        provider_providerId: {
          provider,
          providerId: id,
        },
      },
      update: {}, // nothing to update
      create: {
        provider,
        providerId: id,
        userId: user.id,
      },
    });

    await redis.set(
      sessionId,
      JSON.stringify({ userId: user.id }),
      { ex: +(process.env.SESSION_LIVE_AGE ?? 0) }
    );

    await setSessionCookie(sessionId);
    return user;
  });
}
