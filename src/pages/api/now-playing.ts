export const prerender = false;

import type { APIRoute } from "astro";
import { getNowPlaying } from "../../lib/spotify";

export const GET: APIRoute = async () => {
  const res = await getNowPlaying();

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
