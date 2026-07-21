import { env } from "cloudflare:workers";
import { Buffer } from "node:buffer";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const REFRESH_TOKEN_KEY = "spotify_refresh_token";

export async function getSpotifyAccessToken(): Promise<string | null> {
  const store = env.SPOTIFY_KV;
  const refreshToken =
    (await store?.get(REFRESH_TOKEN_KEY)) ?? env.SPOTIFY_REFRESH_TOKEN;

  if (!refreshToken) {
    console.error("[spotify] no refresh token available");
    return null;
  }

  const basic = Buffer.from(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    error?: string;
  };

  if (!res.ok || !data.access_token) {
    if (data.error === "invalid_grant") {
      console.error(
        "[spotify] refresh token expired (invalid_grant) — re-authorize to mint a new one",
      );
    } else {
      console.error(
        `[spotify] token refresh failed (${res.status})`,
        data.error ?? "",
      );
    }
    return null;
  }

  if (store && data.refresh_token && data.refresh_token !== refreshToken) {
    await store.put(REFRESH_TOKEN_KEY, data.refresh_token);
  }

  return data.access_token;
}
