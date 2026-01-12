import { AuthType } from "@/generated/prisma/enums";

export const AUTH_INFO: Record<
  AuthType,
  {
    authorizeURL: string;
    clientIdKey: string;
    secretIdKey: string;
    scope: string;
    tokenURL: string;
    userDetailsURL: string;
    isPKCE:  boolean;
  }
> = {
  discord: {
    authorizeURL: "https://discord.com/oauth2/authorize",
    clientIdKey: "DISCORD_CLIENT_ID",
    scope: "identify email",
    tokenURL: "https://discord.com/api/oauth2/token",
    secretIdKey: "DISCORD_CLIENT_SECRET",
    userDetailsURL: "https://discord.com/api/users/@me",
    isPKCE: false
  },
  google: {
    authorizeURL: "",
    clientIdKey: "DISCORD_CLIENT_ID",
    scope: "",
    tokenURL: "",
    secretIdKey: "",
    userDetailsURL: "",
    isPKCE: true
  },
  x: {
    authorizeURL: "https://x.com/i/oauth2/authorize",
    clientIdKey: "X_CLIENT_ID",
    scope: "users.email offline.access users.read tweet.read",
    tokenURL: "https://api.x.com/2/oauth2/token",
    secretIdKey: "X_CLIENT_SECRET",
    userDetailsURL: "https://api.x.com/2/users/me",
    isPKCE: true,
  },
};
