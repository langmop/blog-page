import { AuthType } from "@/generated/prisma/enums";
import { connectUser } from "@/lib/actions/auth/connect-provider-and-user-action";
import { OAuthClient } from "@/lib/core/auth/base";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import z from "zod";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ provider: string }>;
  }
) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const provider = z.enum(AuthType).parse(rawProvider);

  if (typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/admin?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again"
      )}`
    );
  }

  const user = await new OAuthClient().fetchUser(code, state, await cookies(), provider);
  const connectedUser = await connectUser({
    ...user,
    provider,
  });
  redirect("/admin/dashboard");
}
