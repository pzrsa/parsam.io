import Head from "next/head";
import Image from "next/legacy/image";
import PageTitle from "../components/PageTitle";
import { FAVOURITE_FILMS, FAVOURITE_SHOWS } from "../lib/data";
import me from "../public/images/me.jpg";

export default function About() {
  const title = "About - Parsa Mesgarha";
  const image = "about.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={title} key="og:description" />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={title}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <div className="px-6">
        <PageTitle>About</PageTitle>
        <div className="prose dark:prose-invert">
          <div className="relative sm:flex sm:flex-row-reverse">
            <div className="mx-auto w-60 h-60 sm:w-full sm:h-full ">
              <Image className="rounded-full" src={me} alt="Parsa Mesgarha" />
            </div>
            <div className="prose dark:prose-invert mt-5 sm:mr-3 sm:mt-0">
              <p>
                My name&apos;s Parsa, and I&apos;m a 20 year old from London,
                England. Currently I&apos;m at Google as a Software Engineer
                working on the{" "}
                <ExternalLink href="https://web.dev/" name="Web" /> via{" "}
                <ExternalLink
                  href="https://www.chromium.org/Home/"
                  name="Chrome"
                />{" "}
                for{" "}
                <ExternalLink
                  href="https://source.android.com/"
                  name="Android"
                />
                .
              </p>
              <p>
                This page is intended to paint a picture of the type of person I
                am, so if anything on here resonates with you, don&apos;t
                hesitate to reach out on either{" "}
                <ExternalLink
                  href="https://twitter.com/pzrsaa"
                  name="Twitter"
                />
                , Discord (<b>@pzrsa</b>) or{" "}
                <ExternalLink href="mailto:hi@parsam.io" name="Email" /> (
                <b>hi@parsam.io</b>).
              </p>
            </div>
          </div>
          <div>
            <h3>Fitness</h3>
            <ul>
              <li>
                I aim to train 4-5 days a week, mostly focusing on strength and{" "}
                <ExternalLink
                  href="https://en.wikipedia.org/wiki/Muscle_hypertrophy"
                  name="hypertrophy"
                />{" "}
                with the occasional cardio.{" "}
              </li>
              <li>
                I&apos;ve transitioned away from the{" "}
                <ExternalLink
                  href="https://www.google.com/search?q=bro+split"
                  name="Bro Split"
                />{" "}
                to my own version of{" "}
                <ExternalLink
                  href="https://www.google.com/search?q=push+pull+legs"
                  name="Push/Pull/Legs"
                />
                .{" "}
              </li>
            </ul>
          </div>
          <div>
            <h3>Supplements</h3>
            <ul>
              <li>
                <ExternalLink
                  href="https://www.optimumnutrition.com/en-gb/Products/Advanced-Fitness/Muscle-Building/Micronised-Creatine-Powder/p/creatine-micronized"
                  name="Creatine Monohydrate"
                />{" "}
                (daily)
              </li>
              <li>
                <ExternalLink
                  href="https://www.optimumnutrition.com/en-gb/Products/Protein-Powders/Gold-Standard-100%25-Whey-Protein-/p/gold-standard-100-whey-protein"
                  name="Whey Protein"
                />{" "}
                (daily)
              </li>
              <li>
                <ExternalLink
                  href="https://www.vitabiotics.com/products/wellman-original-tablets"
                  name="Multivitamin"
                />{" "}
                (daily)
              </li>
              <li>
                <ExternalLink
                  href="https://www.vitabiotics.com/products/ultra-vitamin-d-2000iu-extra-strength-96-tablets"
                  name="Vitamin D"
                />{" "}
                (daily)
              </li>
            </ul>
          </div>
          <div>
            <h3>Favourites</h3>
            <em>Sorted alphabetically, each one linking to its IMDB page.</em>
            <h4>Films</h4>
            <div className="grid grid-cols-4 gap-y-6 gap-x-6">
              {FAVOURITE_FILMS.map((film) => (
                <a
                  href={`https://www.imdb.com/title/${film.imdbID}`}
                  className="group"
                  key={film.title}
                  rel="prefetch noreferrer"
                  target="_blank"
                >
                  <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg cursor-pointer shadow-lg">
                    <Image
                      alt={film.title}
                      src={`https://image.tmdb.org/t/p/original/${film.imageID}.jpg`}
                      layout="fill"
                      className="group-hover:opacity-75 transition-all"
                    />
                  </div>
                </a>
              ))}
            </div>
            <h4>Shows</h4>
            <div className="grid grid-cols-3 gap-y-6 gap-x-6">
              {FAVOURITE_SHOWS.map((show) => (
                <a
                  href={`https://www.imdb.com/title/${show.imdbID}`}
                  className="group"
                  key={show.title}
                  rel="prefetch noreferrer"
                  target="_blank"
                >
                  <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg cursor-pointer shadow-lg">
                    <Image
                      alt={show.title}
                      src={`https://image.tmdb.org/t/p/original/${show.imageID}.jpg`}
                      layout="fill"
                      className="group-hover:opacity-75 transition-all"
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
