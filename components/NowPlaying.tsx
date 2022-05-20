import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error) return <div>failed to load :&#40;</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="text-md sm:text-lg fold:text-sm">
      {data?.isPlaying ? (
        <a
          className="flex space-x-2 items-center hover:text-neutral-500 dark:hover:text-neutral-400 transition-all cursor-pointer"
          href={data.songUrl}
          rel="prefetch noreferrer"
          target="_blank"
        >
          <span>
            <SiSpotify />
          </span>
          <span>
            Listening to <span className="font-bold">{data.title}</span> by{" "}
            <span className="font-bold">{data.artist}</span>
          </span>
        </a>
      ) : (
        <p className="flex space-x-2 items-center hover:text-neutral-500 dark:hover:text-neutral-400 transition-all cursor-default">
          <span>
            <SiSpotify />
          </span>
          <span>Not playing anything</span>
        </p>
      )}
    </div>
  );
};

export default NowPlaying;
