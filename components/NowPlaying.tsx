import Image from "next/image";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error) return <div>failed to load :&#40;</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {data?.isPlaying ? (
        <a
          className="flex items-center space-x-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400 transition-all group"
          href={data.songUrl}
          rel="prefetch noreferrer"
          target="_blank"
        >
          <span className="flex min-w-fit items-center justify-center">
            <Image
              className="rounded-lg group-hover:opacity-80 transition-all"
              alt={data.album}
              src={data.albumImageUrl}
              width={60}
              height={60}
            />
          </span>
          <span>
            <SiSpotify />
          </span>
          <span>
            Listening to <span className="font-bold">{data.title}</span> by{" "}
            <span className="font-bold">{data.artist}</span>
          </span>
        </a>
      ) : (
        <p className="flex space-x-2 items-center cursor-default hover:text-neutral-500 dark:hover:text-neutral-400 transition-all">
          <span>
            <SiSpotify />
          </span>
          <span>Not playing anything</span>
        </p>
      )}
    </>
  );
};

export default NowPlaying;
