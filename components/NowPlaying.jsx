import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import styles from "../styles/modules/NowPlaying.module.css";

const NowPlaying = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data?.isPlaying ? (
        <p className={styles.p}>
          <SiSpotify className={styles.icon} /> Listening to{" "}
          <a href={data.songUrl} rel="prefetch noreferrer" target="_blank">
            {data.title} by {data.artist}
          </a>
        </p>
      ) : (
        <p className={styles.p}>
          <SiSpotify className={styles.icon} /> Not listening to anything
        </p>
      )}
    </>
  );
};

export default NowPlaying;
