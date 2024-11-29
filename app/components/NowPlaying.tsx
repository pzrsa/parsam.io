"use client";

import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);
  const SpotifyIcon = () => <SiSpotify color="#1DB954" />;

  if (error)
    return (
      <p className="flex items-baseline gap-2">
        <SpotifyIcon />
        failed to load
      </p>
    );
  if (!data)
    return (
      <p className="flex items-baseline gap-2">
        <SpotifyIcon />
        Loading...
      </p>
    );

  return (
    <span>
      {data?.isPlaying ? (
        <a
          href={data.songUrl}
          rel="prefetch noreferrer"
          target="_blank"
          className="flex items-baseline gap-2"
        >
          <span>
            <SpotifyIcon />
          </span>
          <span>
            Playing <span className="font-bold">{data.title}</span> by{" "}
            <span className="font-bold">{data.artist}</span>
          </span>
        </a>
      ) : (
        <a
          href="https://open.spotify.com/user/e4ebkdi70a4wu03jwbwrglzhk"
          rel="prefetch noreferrer"
          target="_blank"
          className="flex items-baseline gap-2"
        >
          <SpotifyIcon />
          Not playing anything
        </a>
      )}
    </span>
  );
};

export default NowPlaying;
