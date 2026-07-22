export const prerender = false;

import type { APIRoute } from "astro";
import { getSpotifyAccessToken } from "../../lib/spotify";

const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

export const GET: APIRoute = async () => {
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) {
    return json({ isPlaying: false });
  }

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204 || !res.ok) {
    return json({ isPlaying: false });
  }

  const data = await res.json<{
    currently_playing_type: string;
    is_playing: boolean;
    item: {
      name: string;
      artists: { name: string }[];
      album: { name: string; images: { url: string }[] };
      external_urls: { spotify: string };
      explicit: boolean;
    };
  }>();

  if (data.currently_playing_type !== "track") {
    return json({ isPlaying: false });
  }

  const payload = {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0].url,
    songUrl: data.item.external_urls.spotify,
    explicit: data.item.explicit,
  };

  return json(payload);
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
