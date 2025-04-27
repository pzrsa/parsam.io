import Image from "next/image";
import Link from "next/link";
import me from "../public/avatar.jpeg";
import NowPlaying from "./components/NowPlaying";
import { FAVOURITE_ALBUMS, FAVOURITE_FILMS, FAVOURITE_SHOWS } from "./lib/data";
import { ExternalLink, SubscribeForm } from "./components/common";

export default function Page() {
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <ExternalLink href="https://x.com/pzrsaa">
              <Image
                alt="Parsa Mesgarha"
                src={me}
                className="border-2 border-black"
                height={80}
                width={80}
                style={{ width: "80px", height: "80px" }}
              />
            </ExternalLink>
          </div>
          <div className="w-fit">
            <NowPlaying />
          </div>
        </div>
      </div>
      <div className="prose">
        <p>
          I&apos;m 21 years old, Persian, born in England, and have spent the
          majority of my life in London.
        </p>
        <p>
          I&apos;m currently working as a Software Engineer at{" "}
          <ExternalLink href="https://www.tesla.com" className="text-tesla-red">
            Tesla
          </ExternalLink>{" "}
          in Berlin. Prior to this, I was at{" "}
          <ExternalLink href="https://google.com">
            <span className="text-google-blue">G</span>
            <span className="text-google-red">o</span>
            <span className="text-google-yellow">o</span>
            <span className="text-google-blue">g</span>
            <span className="text-google-green">l</span>
            <span className="text-google-red">e</span>
          </ExternalLink>{" "}
          for 2 years, primarily contributing to the the{" "}
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
          I have a <Link href="/blog">blog</Link> where I write about stuff I
          find interesting enough to share.
        </p>
        <p>
          If anything here piques your interest, don&apos;t hesitate to{" "}
          <ExternalLink href="mailto:hi@parsam.io">reach out</ExternalLink>. I
          love meeting new people!
        </p>
        <div>
          <h3>Newsletter</h3>
          <SubscribeForm />
          <h3>Links</h3>
          <div className="not-prose grid grid-cols-3 sm:grid-cols-4">
            <LinkItem href="https://x.com/pzrsaa">Twitter/X</LinkItem>
            <LinkItem href="https://github.com/pzrsa">GitHub</LinkItem>
            <LinkItem href="https://www.youtube.com/@pzrsa">YouTube</LinkItem>
            <LinkItem href="https://www.instagram.com/parsamesgarha">
              Instagram
            </LinkItem>
            <LinkItem href="https://www.linkedin.com/in/parsamesgarha">
              LinkedIn
            </LinkItem>
            <LinkItem href="https://github.com/pzrsa/parsam.io">
              Source Code
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
          <p>
            I joined Tesla, and moved to Berlin! More details in this post:{" "}
            <Link href={"/tesla"}>I joined Tesla (and moved to Berlin)</Link>.
          </p>
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
            .
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
      className="flex items-center gap-2 w-fit underline text-blue-600"
    >
      {children}
    </ExternalLink>
  );
};
