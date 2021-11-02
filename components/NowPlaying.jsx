import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const NowPlaying = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data?.isPlaying ? (
        <p>
          <SiSpotify /> Listening to{" "}
          <a href={data.songUrl} rel="prefetch noreferrer" target="_blank">
            {data.title} by {data.artist}
          </a>
        </p>
      ) : (
        <p>
          <SiSpotify /> Not listening to anything
        </p>
      )}
    </>
  );
};

export default NowPlaying;
