import { NextApiRequest, NextApiResponse } from "next";
import { getNowPlaying } from "../../lib/spotify";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const data = await response.json();
  if (data.currently_playing_type !== "track") {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying: boolean = data.is_playing;
  const title: string = data.item.name;
  const artist: string = data.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(", ");
  const album: string = data.item.album.name;
  const albumImageUrl: string = data.item.album.images[0].url;
  const songUrl: string = data.item.external_urls.spotify;

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
};

export default handler;
