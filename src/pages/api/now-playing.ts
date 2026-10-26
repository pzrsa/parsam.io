export const prerender = false;

import type { APIRoute } from "astro";
import { getSpotifyAccessToken } from "../../lib/spotify";

const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode";

type SpotifyImage = { url: string };

type PlayingItem = {
  name: string;
  external_urls: { spotify: string };
  explicit: boolean;
} & (
  | {
      type: "track";
      artists: { name: string }[];
      album: { name: string; images: SpotifyImage[] };
    }
  | {
      type: "episode";
      images: SpotifyImage[];
      show: { name: string; images: SpotifyImage[] };
    }
);

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
    item: PlayingItem | null;
  }>();

  const item = data.item;

  if (
    !item ||
    (data.currently_playing_type !== "track" &&
      data.currently_playing_type !== "episode")
  ) {
    return json({ isPlaying: false });
  }

  if (item.type === "episode") {
    return json({
      isPlaying: data.is_playing,
      title: item.name,
      artist: item.show.name,
      album: item.show.name,
      albumImageUrl: item.images[0]?.url ?? item.show.images[0]?.url,
      songUrl: item.external_urls.spotify,
      explicit: item.explicit,
    });
  }

  if (item.type !== "track") {
    return json({ isPlaying: false });
  }

  const payload = {
    isPlaying: data.is_playing,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    album: item.album.name,
    albumImageUrl: item.album.images[0]?.url,
    songUrl: item.external_urls.spotify,
    explicit: item.explicit,
  };

  return json(payload);
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
