"use server";
import { SignupSchema, type SignupInput } from "@/lib/validators/signup.schema";
import { prisma } from "../../../../lib/db";
import { getHashedPassword } from "@/utils/auth/utils";
import { logger } from "../../../../lib/piano";
import type { User } from "@/generated/prisma/client";
import crypto from "crypto";
import { redis } from "../../../../lib/redis";
import { setSessionCookie } from "./set-cookie-action";

type PublicUser = Omit<User, "password">;

export default async function addUser(
  userDetails: SignupInput
): Promise<PublicUser> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });

    if (user) {
      throw new Error("User already has an existing account please login");
    }

    const parsed = SignupSchema.safeParse(userDetails);

    if (!parsed.success) {
      logger.warn({ input: parsed.error.flatten() }, "Invalid signup payload");
      throw new Error("Invalid input");
    }

    const { email, password, username } = userDetails;

    const hashedPassword = await getHashedPassword(password);

    const sessionId = crypto.randomBytes(32).toString("hex");

    const savedUser = await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await redis.set(
      sessionId,
      JSON.stringify({ userId: savedUser.id }),
      { ex: 30 } // 10 minutes
    );

    await setSessionCookie(sessionId);

    return savedUser;
  } catch (err: any) {
    const safeInput = SignupSchema.omit({ password: true }).safeParse(
      userDetails
    );

    logger.error(
      {
        err,
        input: safeInput,
      },
      err.message
    );
    throw new Error(err.message);
  }
}
