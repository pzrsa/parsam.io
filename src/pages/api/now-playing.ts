export const prerender = false;

import type { APIRoute } from "astro";
import { Buffer } from "node:buffer";

const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export const GET: APIRoute = async () => {
  const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
  });

  const tokenData = await tokenRes.json();

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (res.status === 204 || res.status > 400) {
    return json({ isPlaying: false });
  }

  const data = await res.json();

  if (data.currently_playing_type !== "track") {
    return json({ isPlaying: false });
  }

  const payload = {
    isPlaying: data.is_playing as boolean,
    title: data.item.name as string,
    artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
    album: data.item.album.name as string,
    albumImageUrl: data.item.album.images[0].url as string,
    songUrl: data.item.external_urls.spotify as string,
  };

  return json(payload);
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
