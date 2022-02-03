import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import styles from "../styles/modules/NowPlaying.module.css";

const NowPlaying: React.FC = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error) return <div>failed to load :&#40;</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.nowPlaying}>
      {data?.isPlaying ? (
        <p className={styles.p}>
          <a href={data.songUrl} rel="prefetch noreferrer" target="_blank">
            <SiSpotify className={styles.icon} /> Playing{" "}
            <strong>
              {data.title} by {data.artist}
            </strong>{" "}
          </a>
        </p>
      ) : (
        <p className={styles.p}>
          <SiSpotify className={styles.icon} /> Not playing
        </p>
      )}
    </div>
  );
};

export default NowPlaying;
