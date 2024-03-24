"use client";

import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);
  const SpotifyIcon = () => <SiSpotify color="#1DB954" />;

  if (error)
    return (
      <p className="flex items-baseline gap-2 cursor-default text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all">
        <span>
          <SpotifyIcon />
        </span>
        failed to load
      </p>
    );
  if (!data)
    return (
      <p className="flex items-baseline gap-2 cursor-default text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all">
        <span>
          <SpotifyIcon />
        </span>
        loading...
      </p>
    );

  return (
    <span>
      {data?.isPlaying ? (
        <a
          href={data.songUrl}
          rel="prefetch noreferrer"
          target="_blank"
          className="flex items-baseline gap-2 cursor-pointer text-black hover:text-zinc-500 dark:text-white dark:hover:text-zinc-400  transition-all"
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
        <p className="flex items-baseline gap-2 cursor-default text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all">
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
