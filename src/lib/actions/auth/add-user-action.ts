"use server";
import z from "zod";
import { IUserFormDetails } from "@/components/forms/signup";
import { prisma } from "../../../../lib/db";
import { getHashedPassword } from "@/utils/auth/utils";
import { logger } from "../../../../lib/piano";
import type { User } from "@/generated/prisma/client";

type PublicUser = Omit<User, "password">;

export default async function addUser(
  userDetails: z.infer<typeof IUserFormDetails>
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

    const parsed = IUserFormDetails.safeParse(userDetails);

    if (!parsed.success) {
      logger.warn({ input: parsed.error.flatten() }, "Invalid signup payload");
      throw new Error("Invalid input");
    }

    const { email, password, username } = userDetails;

    const hashedPassword = await getHashedPassword(password);

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

    return savedUser;
  } catch (err) {
    const safeInput = IUserFormDetails.omit({ password: true }).safeParse(
      userDetails
    );

    logger.error(
      {
        err,
        input: safeInput,
      },
      "User form validation failed"
    );
    throw new Error("Failed Registering user");
  }
}
