import { getNowPlaying } from "../../lib/spotify";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(_: Request) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return Response.json({ isPlaying: false }, { status: 200 });
  }

  const data = await response.json();
  if (data.currently_playing_type !== "track") {
    return Response.json({ isPlaying: false }, { status: 200 });
  }

  const isPlaying: boolean = data.is_playing;
  const title: string = data.item.name;
  const artist: string = data.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(", ");
  const album: string = data.item.album.name;
  const albumImageUrl: string = data.item.album.images[0].url;
  const songUrl: string = data.item.external_urls.spotify;

  return Response.json(
    {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    },
    { status: 200 },
  );
}
