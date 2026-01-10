"use server";

import { AuthType } from "@/generated/prisma/enums";
import { OAuthClient } from "@/lib/core/auth/base";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function oAuthSign(provider: AuthType) {
  // get oAuth url;
  redirect(new OAuthClient().createAuth(await cookies()));
}
