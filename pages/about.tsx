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
        <PageTitle name="About" />
        <div className="prose dark:prose-invert">
          <div className="relative sm:flex sm:flex-row-reverse">
            <div className="mx-auto w-60 h-60 sm:w-full sm:h-full ">
              <Image className="rounded-full" src={me} alt="Parsa Mesgarha" />
            </div>
            <div className="prose dark:prose-invert mt-5 sm:mr-3 sm:mt-0">
              <p>
                My name&apos;s Parsa, and I&apos;m a 20 year old from London,
                England. Currently I&apos;m at Google as a Software Engineering{" "}
                <ExternalLink
                  href="https://buildyourfuture.withgoogle.com/apprenticeships"
                  name="Apprentice"
                />
                , working on the{" "}
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
                Currently training 4-5 days a week, mostly focusing on strength
                and{" "}
                <ExternalLink
                  href="https://en.wikipedia.org/wiki/Muscle_hypertrophy"
                  name="hypertrophy"
                />{" "}
                with the occasional cardio.{" "}
              </li>
              <li>
                I&apos;m slowly transitioning away from the{" "}
                <ExternalLink
                  href="https://www.muscleandstrength.com/workouts/the-ultimate-bro-split"
                  name="Bro Split"
                />{" "}
                to a modified version of{" "}
                <ExternalLink
                  href="https://www.muscleandstrength.com/workouts/6-day-powerbuilding-split-meal-plan"
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
            <h4>Films</h4>
            <div className="grid grid-cols-3 gap-y-6 gap-x-6 sm:grid-cols-4">
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
            <div className="grid grid-cols-3 gap-y-6 gap-x-6 sm:grid-cols-4">
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
            <h3>Likes</h3>
            <ul>
              <li>
                <ExternalLink
                  href="https://github.com/pzrsa?tab=stars"
                  name="Open source projects"
                />
                . It&apos;s fascinating that random people all over the internet
                are able to come together to change the world.
              </li>
              <li>
                Reading{" "}
                <ExternalLink
                  href="https://www.goodreads.com/review/list/125053326?page=1&shelf=%23ALL%23"
                  name="books"
                />{" "}
                on my Kindle Paperwhite.
              </li>
              <li>
                Mechanical keyboards. I use a keyboard daily, so it makes sense
                for me to invest in tools that inspire me to use them more.
              </li>
              <li>
                Typing on{" "}
                <ExternalLink href="https://monkeytype.com" name="monkeytype" />
                , I&apos;m actually addicted to it. Feel free to check out my
                personal records on my{" "}
                <ExternalLink
                  href="https://monkeytype.com/profile/pzrsa"
                  name="profile"
                />
                .
              </li>
              <li>
                Mechanical watches and G-Shock&apos;s. I own a Seiko{" "}
                <ExternalLink
                  href="/images/articles/2022-photos/seiko.jpg"
                  name="SNZG13K1"
                />{" "}
                and a G-Shock{" "}
                <ExternalLink
                  href="https://www.casio.com/intl/watches/gshock/product.GA-B2100-1A1/"
                  name="GA-B2100-1A1"
                />
                . I love how boringly beautiful they are, which makes me feel
                good wearing them.
              </li>
              <li>
                Vi keybinds, I can&apos;t live without them as it simply makes
                interacting with the computer a joy.
              </li>
              <li>
                Consuming <i>informational</i> content at 2x speed.{" "}
                <ExternalLink
                  href="https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk?hl=en"
                  name="Video Speed Controller"
                />{" "}
                has completely changed the way I watch videos. And yes, I watch
                other stuff at normal speed, I&apos;m not a psycho.
              </li>
            </ul>
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
                <a href="https://mastodon.social/@pzrsa" rel="prefetch me">
                  Mastodon
                </a>
              </li>
              <li>
                <ExternalLink href="https://medium.com/@pzrsa" name="Medium" />
              </li>
              <li>
                <ExternalLink
                  href="https://stackoverflow.com/users/14889706/pzrsa"
                  name="Stack Overflow"
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
