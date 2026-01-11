import { Cookies } from "@/interfaces/common";
import z from "zod";
import crypto from "crypto";
import { AuthType } from "@/generated/prisma/enums";
import { AUTH_INFO } from "@/constants/auth";

const STATE_COOKIE_KEY = "oAuthState";
const VERIFIER_COOKIE_KEY = "oAuthState";
const COOKIE_EXPIRATION_SECONDS = 60 * 10;
export class OAuthClient {
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  });

  private readonly userSchema = z.object({
    id: z.string(),
    username: z.string(),
    global_name: z.string().nullable(),
    email: z.string().email(),
  });

  private get redirectUrl() {
    return new URL("discord", process?.env?.OAUTH_REDIRECT_URL_BASE);
  }

  async createAuth(cookies: Cookies, provider: AuthType) {
    const url = new URL(AUTH_INFO[provider].authorizeURL);
    const state = createState(cookies);
    const code_verifier = generateCodeVerifier(cookies);
    const code_challenge = await generateCodeChallenge(code_verifier);
    url.searchParams.set(
      "client_id",
      process?.env?.[AUTH_INFO[provider]?.clientIdKey] ?? ""
    );
    url.searchParams.set("redirect_uri", this.redirectUrl.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", AUTH_INFO[provider]?.scope);
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge", code_challenge);
    url.searchParams.set("code_challenge_method", "S256");
    return url.toString();
  }

  async fetchUser(
    code: string,
    state: string,
    cookies: Cookies,
    provider: AuthType
  ) {
    const isValidateState = validateState(state, cookies);
    if (!isValidateState) throw new InvalidStateError();
    const { accessToken, tokenType } = await this.fetchToken(
      code,
      provider,
      cookies
    );
    const user = await fetch(AUTH_INFO[provider]?.userDetailsURL, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } = this.userSchema.safeParse(rawData);
        if (!success) throw new InvalidUserError(error);
        return data;
      });
    console.log(user, 'dddd')
    return {
      id: user?.id,
      email: user?.email,
      name: user?.global_name ?? user?.username,
    };
  }

  private async fetchToken(code: string, provider: AuthType, cookies: Cookies) {
    const code_verifier = cookies.get(VERIFIER_COOKIE_KEY)?.value!;
    return fetch(AUTH_INFO[provider]?.tokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: process.env?.[AUTH_INFO[provider]?.clientIdKey] ?? "",
        client_secret: process.env?.[AUTH_INFO[provider]?.secretIdKey] ?? "",
        code_verifier: code_verifier,
      }),
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } = this.tokenSchema.safeParse(rawData);
        if (!success) throw new InvalidTokenError(error);
        return {
          accessToken: data?.access_token,
          tokenType: data.token_type,
        };
      });
  }
}

export class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid User");
    this.cause = zodError;
  }
}

export class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid Token");
    this.cause = zodError;
  }
}

export class InvalidStateError extends Error {
  constructor() {
    super("Invalid State");
  }
}

function createState(cookies: Pick<Cookies, "set">) {
  const state = crypto.randomBytes(64).toString("hex").normalize();
  if (cookies.set)
    cookies.set(STATE_COOKIE_KEY, state, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + COOKIE_EXPIRATION_SECONDS * 1000),
    });
  return state;
}

function generateCodeVerifier(cookies: Pick<Cookies, "set">, length = 64) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let verifier = "";

  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  randomValues.forEach((v) => {
    verifier += chars[v % chars.length];
  });

  if (cookies.set)
    cookies.set(VERIFIER_COOKIE_KEY, verifier, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + COOKIE_EXPIRATION_SECONDS * 1000),
    });

  return verifier;
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);

  const digest = await crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function validateState(state: string, cookies: Pick<Cookies, "get">) {
  const cookieState = cookies.get(STATE_COOKIE_KEY)?.value;
  return cookieState === state;
}
