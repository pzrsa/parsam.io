import Image from "next/legacy/image";
import Link from "next/link";
import me from "../public/images/avatar.jpeg";
import NowPlaying from "./components/NowPlaying";
import {
  FAVOURITE_ALBUMS,
  FAVOURITE_FILMS,
  FAVOURITE_SHOWS,
  SHOWS_WATCHING,
} from "./lib/data";

export default function Page() {
  return (
    <>
      <div className="px-4">
        <div className="flex items-center gap-2 px-2">
          <a
            href="https://twitter.com/pzrsaa"
            rel="prefetch noreferrer"
            target="_blank"
            className="h-16 w-16 overflow-hidden rounded-full shadow-lg relative"
          >
            <Image
              alt="Parsa Mesgarha"
              src={me}
              className="grayscale transition-all hover:animate-spin hover:grayscale-0 motion-reduce:animate-none"
            />
          </a>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl ">
              Hi, I&apos;m Parsa.
            </h1>
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Software Engineer at <span className="text-[#cc0000]">???</span>
            </p>
          </div>
        </div>
        <div className="my-6 max-w-fit">
          <NowPlaying />
        </div>
      </div>
      <div className="prose dark:prose-invert px-6">
        <p>
          I&apos;m 20 years old, Persian, born in England, and have spent the
          majority of my life in London. I was at Google for 2 years, primarily
          contributing to the{" "}
          <a href="https://web.dev/" rel="prefetch noreferrer" target="_blank">
            Web Platform
          </a>{" "}
          through{" "}
          <a
            href="https://www.chromium.org/Home/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Chrome
          </a>{" "}
          and{" "}
          <a
            href="https://source.android.com/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Android
          </a>
          .
        </p>
        <p>
          I have a <Link href="/blog">blog</Link> writing notes on the books
          I&apos;ve read, and articles on stuff I find interesting enough to
          share.
        </p>
        <p>
          If anything here piques your interest, don&apos;t hesitate to{" "}
          <ExternalLink href="mailto:hi@parsam.io" name="reach out" />!
        </p>
        <div>
          <h2>Now</h2>
          <h3>Career</h3>
          <p>
            Recently I&apos;ve signed a contract for a new position based in
            Berlin, so currently I&apos;m going through the whole immigration
            process which I&apos;m really looking forward to. I&apos;m estimated
            to start in March, and I&apos;ll of course be sharing more news on
            this next endeavour by then :)
          </p>
          <h3>Media</h3>
          <h4>Shows I&apos;m watching</h4>
          <div className="grid grid-cols-3 gap-x-6 gap-y-6">
            {SHOWS_WATCHING.map((show) => (
              <a
                href={`https://www.imdb.com/title/${show.imdbID}`}
                className="group"
                key={show.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-2 aspect-h-3 cursor-pointer overflow-visible shadow-2xl">
                  {show.active && (
                    <span className="-top-1 -left-1 inline-flex rounded-full h-3 w-3 bg-green-500 z-10">
                      <span className="animate-ping h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    </span>
                  )}
                  <Image
                    alt={show.title}
                    src={`https://image.tmdb.org/t/p/original/${show.tmdbImageID}.jpg`}
                    layout="fill"
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>Favourites</h2>
          <h3>Albums</h3>
          <div className="grid grid-cols-3 gap-x-6 gap-y-6">
            {FAVOURITE_ALBUMS.map((album) => (
              <a
                href={`https://open.spotify.com/album/${album.spotifyID}`}
                className="group"
                key={album.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-1 aspect-h-1 cursor-pointer shadow-2xl">
                  <Image
                    alt={album.title}
                    src={`https://i.scdn.co/image/${album.spotifyImageID}`}
                    layout="fill"
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
          <h3>Films</h3>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6">
            {FAVOURITE_FILMS.map((film) => (
              <a
                href={`https://www.imdb.com/title/${film.imdbID}`}
                className="group"
                key={film.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-2 aspect-h-3 cursor-pointer shadow-2xl">
                  <Image
                    alt={film.title}
                    src={`https://image.tmdb.org/t/p/original/${film.tmdbImageID}.jpg`}
                    layout="fill"
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
          <h3>Shows</h3>
          <div className="grid grid-cols-3 gap-x-6 gap-y-6">
            {FAVOURITE_SHOWS.map((show) => (
              <a
                href={`https://www.imdb.com/title/${show.imdbID}`}
                className="group"
                key={show.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-2 aspect-h-3 cursor-pointer shadow-2xl">
                  <Image
                    alt={show.title}
                    src={`https://image.tmdb.org/t/p/original/${show.tmdbImageID}.jpg`}
                    layout="fill"
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>More Links</h3>
          <ul>
            <li>
              <ExternalLink
                href="https://www.youtube.com/@pzrsa"
                name="YouTube"
              />
            </li>
            <li>
              <ExternalLink
                href="https://open.spotify.com/user/e4ebkdi70a4wu03jwbwrglzhk"
                name="Spotify"
              />
            </li>
            <li>
              <ExternalLink
                href="https://news.ycombinator.com/user?id=pzrsa"
                name="HN"
              />
            </li>
            <li>
              <ExternalLink
                href="https://monkeytype.com/profile/pzrsa"
                name="Monkeytype"
              />
            </li>
            <li>
              <ExternalLink
                href="https://www.goodreads.com/pzrsa"
                name="Goodreads"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

interface ExternalLinkProps {
  href: string;
  name: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, name }) => {
  return (
    <a href={href} rel="prefetch noreferrer" target="_blank">
      {name}
    </a>
  );
};
