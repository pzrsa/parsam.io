export const prerender = false;

import type { APIRoute } from "astro";
import { Buffer } from "node:buffer";

const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

export const GET: APIRoute = async () => {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
  });

  const tokenData = await tokenRes.json();

  const res = await fetch(RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (res.status === 204 || res.status > 400) {
    return json({ tracks: [] });
  }

  const data = await res.json();

  const tracks = data.items.map((item: any) => ({
    title: item.track.name,
    artist: item.track.artists.map((a: { name: string }) => a.name).join(", "),
    album: item.track.album.name,
    albumImageUrl: item.track.album.images[0]?.url,
    songUrl: item.track.external_urls.spotify,
    explicit: item.track.explicit,
    playedAt: item.played_at,
  }));

  return json({ tracks });
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
