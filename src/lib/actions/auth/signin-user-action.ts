"use server"

import { SignupSchema, type SignupInput } from "@/lib/validators/signup.schema";
import { prisma } from "../../../../lib/db";
import { getHashedPassword, isPasswordSame } from "@/utils/auth/utils";
import { logger } from "../../../../lib/piano";
import type { User } from "@/generated/prisma/client";
import crypto from "crypto";
import { redis } from "../../../../lib/redis";
import { SigninSchema,SigninInput } from "@/lib/validators/signin.schema";
import { email } from "zod";

type PublicUser = Omit<User, "password">;

export default async function signInUser(
  userDetails: SigninInput
): Promise<PublicUser> {
  try {


    const user = await prisma.user.findUnique({
        where: {
            name: userDetails.username
        }
    });

    if (user) {
      throw new Error("Username or Password is wrong");
    }

    const parsed = SigninSchema.safeParse(userDetails);

    if (!parsed.success) {
      logger.warn({ input: parsed.error.flatten() }, "Invalid signup payload");
      throw new Error("Invalid input");
    }

    const { password, username } = userDetails;

    const isCorrectPassword = await isPasswordSame(password, userDetails.password);

    if(isCorrectPassword){
        throw new Error("Username or Password is wrong");
    }

    const sessionId = crypto.randomBytes(32).toString("hex");

    await redis.set(
      sessionId,
      JSON.stringify({ userId: savedUser.id }),
      { ex: 30 } // 10 minutes
    );

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
