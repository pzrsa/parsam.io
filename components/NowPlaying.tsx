import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error)
    return <div className="text-base sm:text-lg">failed to load :&#40;</div>;
  if (!data) return <div className="text-base sm:text-lg">loading...</div>;

  return (
    <span className="text-base sm:text-lg">
      {data?.isPlaying ? (
        <a
          href={data.songUrl}
          rel="prefetch noreferrer"
          target="_blank"
          className="flex items-baseline gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
        >
          <span>
            <SiSpotify color="#1DB954" />
          </span>
          <span>
            Playing <span className="font-bold">{data.title}</span> by{" "}
            <span className="font-bold">{data.artist}</span>
          </span>
        </a>
      ) : (
        <span className="flex gap-2 items-center cursor-default hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2">
          <span>
            <SiSpotify color="#1DB954" />
          </span>
          <span>Not playing anything</span>
        </span>
      )}
    </span>
  );
};

export default NowPlaying;
