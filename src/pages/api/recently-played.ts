export const prerender = false;

import type { APIRoute } from "astro";
import { getSpotifyAccessToken } from "../../lib/spotify";

const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";

export const GET: APIRoute = async () => {
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) {
    return json({ tracks: [] });
  }

  const res = await fetch(RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204 || !res.ok) {
    return json({ tracks: [] });
  }

  const data = await res.json<{ items: any[] }>();

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
