import Image from "next/image";
import Link from "next/link";
import me from "../public/avatar.jpeg";
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
      <div>
        <div className="flex items-center gap-2">
          <ExternalLink href="https://twitter.com/pzrsaa">
            <Image
              alt="Parsa Mesgarha"
              src={me}
              className="grayscale transition-all hover:motion-safe:animate-spin hover:grayscale-0 rounded-full"
              height={70}
              width={70}
            />
          </ExternalLink>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">
              Hi, I&apos;m Parsa.
            </h1>
            <p className="font-semibold text-zinc-600 dark:text-zinc-400">
              Software Engineer at <span className="text-tesla-red">Tesla</span>
            </p>
          </div>
        </div>
        <div className="my-6 max-w-fit">
          <NowPlaying />
        </div>
      </div>
      <div className="prose dark:prose-invert">
        <p>
          I&apos;m 21 years old, Persian, born in England, and have spent the
          majority of my life in London.{" "}
        </p>
        <p>
          I&apos;m currently working at{" "}
          <ExternalLink href="https://www.tesla.com">Tesla</ExternalLink>, based
          in Berlin. Prior to this, I was at Google for 2 years, primarily
          contributing to the{" "}
          <ExternalLink href="https://web.dev/">Web Platform</ExternalLink>{" "}
          through{" "}
          <ExternalLink href="https://www.chromium.org/Home/">
            Chrome
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://source.android.com/">
            Android
          </ExternalLink>
          .
        </p>
        <p>
          I have a <Link href="/blog">blog</Link> writing notes on the books
          I&apos;ve read, and articles on stuff I find interesting enough to
          share.
        </p>
        <p>
          If anything here piques your interest, don&apos;t hesitate to{" "}
          <ExternalLink href="mailto:hi@parsam.io">reach out</ExternalLink>, I
          love meeting new people!
        </p>
        <div>
          <h3>Links</h3>
          <div className="not-prose grid grid-cols-3 sm:grid-cols-4">
            <LinkItem href="https://twitter.com/pzrsaa">Twitter/X</LinkItem>
            <LinkItem href="https://github.com/pzrsa">GitHub</LinkItem>
            <LinkItem href="https://www.youtube.com/@pzrsa">YouTube</LinkItem>
            <LinkItem href="https://www.instagram.com/parsamesgarha">
              Instagram
            </LinkItem>
            <LinkItem href="https://www.linkedin.com/in/parsamesgarha">
              LinkedIn
            </LinkItem>
            <LinkItem href="https://github.com/pzrsa/parsam.io">
              Source
            </LinkItem>
            <LinkItem href="https://letterboxd.com/pzrsa/">Letterboxd</LinkItem>
            <LinkItem href="https://open.spotify.com/user/e4ebkdi70a4wu03jwbwrglzhk">
              Spotify
            </LinkItem>
            <LinkItem href="https://www.last.fm/user/pzrsa">Last.fm</LinkItem>
            <LinkItem href="https://monkeytype.com/profile/pzrsa">
              Monkeytype
            </LinkItem>
            <LinkItem href="https://www.goodreads.com/pzrsa">
              Goodreads
            </LinkItem>
          </div>
        </div>
        <div>
          <h2>Now</h2>
          <h3>Career</h3>
          <p>
            I joined Tesla, and moved to Berlin! More details in this{" "}
            <Link href={"/tesla"}>post</Link>.
          </p>
          <h3>Media</h3>
          <h4>Shows I&apos;m watching or waiting for</h4>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 not-prose">
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
                    <span className="-top-1 -left-1 inline-flex rounded-full h-2.5 w-2.5 bg-zinc-900 dark:bg-zinc-100 z-10">
                      <span className="animate-ping h-full w-full rounded-full bg-zinc-800 dark:bg-zinc-200 opacity-75"></span>
                    </span>
                  )}
                  <Image
                    alt={show.title}
                    src={`https://image.tmdb.org/t/p/original/${show.tmdbImageID}.jpg`}
                    fill
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
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 not-prose">
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
                    fill
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
          <h3>Films</h3>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 not-prose">
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
                    fill
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
          <p>
            You can see the rest on my{" "}
            <ExternalLink href="https://letterboxd.com/pzrsa/likes/films/by/date/size/large/">
              Letterboxd
            </ExternalLink>
          </p>
          <h3>Shows</h3>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 not-prose">
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
                    fill
                    className="transition-all group-hover:opacity-75 rounded-sm"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const ExternalLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
      className={className}
    >
      {children}
    </a>
  );
};

const LinkItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <ExternalLink
      href={href}
      className="flex items-center gap-2 w-fit underline"
    >
      {children}
    </ExternalLink>
  );
};
