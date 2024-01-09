"use client";

import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);
  const SpotifyIcon = () => <SiSpotify color="#1DB954" />;

  if (error)
    return (
      <p className="sm:text-lg flex items-baseline gap-2 cursor-default p-2">
        <span>
          <SpotifyIcon />
        </span>
        failed to load
      </p>
    );
  if (!data)
    return (
      <p className="sm:text-lg flex items-baseline gap-2 cursor-default p-2">
        <span>
          <SpotifyIcon />
        </span>
        loading...
      </p>
    );

  return (
    <span className="sm:text-lg">
      {data?.isPlaying ? (
        <a
          href={data.songUrl}
          rel="prefetch noreferrer"
          target="_blank"
          className="flex items-baseline gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
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
        <p className="flex items-baseline gap-2 cursor-default hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2">
          <span>
            <SpotifyIcon />
          </span>
          Not playing anything
        </p>
      )}
    </span>
  );
};

export default NowPlaying;