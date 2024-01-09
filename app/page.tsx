import Image from "next/legacy/image";
import Link from "next/link";
import me from "../public/images/me.jpg";
import NowPlaying from "./components/now-playing";
import { FAVOURITE_FILMS, FAVOURITE_SHOWS } from "./lib/data";
import { generateFeed } from "./lib/feed";

export default function Page() {
  generateFeed();

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
              placeholder="blur"
              className="grayscale transition-all hover:animate-spin hover:grayscale-0 motion-reduce:animate-none"
            />
          </a>
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl ">
              Hi, I&apos;m Parsa.
            </h1>
            <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 sm:text-lg">
              Software Engineer at{" "}
              <span>
                <span className="text-google-blue">G</span>
                <span className="text-google-red">o</span>
                <span className="text-google-yellow">o</span>
                <span className="text-google-blue">g</span>
                <span className="text-google-green">l</span>
                <span className="text-google-red">e</span>
              </span>
            </p>
          </div>
        </div>
        <div className="my-6 max-w-fit">
          <NowPlaying />
        </div>
      </div>
      <div className="prose dark:prose-invert px-6">
        <p>
          I&apos;m a 20 y/o from London currently working on the{" "}
          <a href="https://web.dev/" rel="prefetch noreferrer" target="_blank">
            Web
          </a>{" "}
          via{" "}
          <a
            href="https://www.chromium.org/Home/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Chrome
          </a>{" "}
          for{" "}
          <a
            href="https://source.android.com/"
            rel="prefetch noreferrer"
            target="_blank"
          >
            Android
          </a>
          . I have a <Link href="/blog">blog</Link> writing notes on the books
          I&apos;ve read, and articles on stuff I find interesting enough to
          share.
        </p>
        <p>
          If anything here piques your interest, don&apos;t hesitate to{" "}
          <ExternalLink href="mailto:hi@parsam.io" name="reach out" />!
        </p>
        <div>
          <h3>Fitness</h3>
          <div>
            <h4>Workout Routine</h4>
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
                />{" "}
                which is shown below. It&apos;s probably not the most optimal,
                but it&apos;s what works with the equipment accessible to me.
              </li>
            </ul>
            <h5>Push</h5>
            <ul>
              <li>Flat Barbell Bench Press</li>
              <li>Incline Dumbbell Bench Press</li>
              <li>Seated Dumbbell Shoulder Press</li>
              <li>Standing Straight Bar Tricep Pushdown</li>
              <li>Standing Cable Chest Flyes</li>
              <li>Dropset (max to 1kg) Lateral Raises</li>
            </ul>
            <h5>Pull</h5>
            <ul>
              <li>Conventional Deadlift</li>
              <li>Seated Lat Pulldown</li>
              <li>Seated Cable Row</li>
              <li>Incline Dumbbell Bicep Curl</li>
              <li>Standing Cable Face Pulls</li>
              <li>Cable Bicep Curls</li>
              <li>Cable Wrist Curls</li>
            </ul>
            <h5>Legs</h5>
          </div>
          <div>
            <h4>Supplements</h4>
            <ul>
              <li>
                <ExternalLink
                  href="https://www.myprotein.com/sports-nutrition/creatine-monohydrate-powder/10530050.html"
                  name="Creatine Monohydrate"
                />
              </li>
              <li>
                <ExternalLink
                  href="https://www.optimumnutrition.com/en-gb/Products/Protein-Powders/Gold-Standard-100%25-Whey-Protein-/p/gold-standard-100-whey-protein"
                  name="Whey Protein"
                />
              </li>
              <li>
                <ExternalLink
                  href="https://www.vitabiotics.com/products/wellman-original-tablets"
                  name="Multivitamin"
                />
              </li>
              <li>
                <ExternalLink
                  href="https://www.vitabiotics.com/products/ultra-vitamin-d-2000iu-extra-strength-96-tablets"
                  name="Vitamin D"
                />
              </li>
            </ul>
          </div>
          <div>
            <p>jk, here&apos;s my Legs day:</p>
            <ul>
              <li>Barbell Back Squat</li>
              <li>Dumbbell Bulgarian Split Squat</li>
              <li>Leg Extension Machine</li>
              <li>Leg Press Machine</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Favourite Films</h3>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6">
            {FAVOURITE_FILMS.map((film) => (
              <a
                href={`https://www.imdb.com/title/${film.imdbID}`}
                className="group"
                key={film.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-2 aspect-h-3 cursor-pointer overflow-hidden rounded-lg shadow-lg">
                  <Image
                    alt={film.title}
                    src={`https://image.tmdb.org/t/p/original/${film.imageID}.jpg`}
                    layout="fill"
                    className="transition-all group-hover:opacity-75"
                  />
                </div>
              </a>
            ))}
          </div>
          <h3>Favourite Shows</h3>
          <div className="grid grid-cols-3 gap-x-6 gap-y-6">
            {FAVOURITE_SHOWS.map((show) => (
              <a
                href={`https://www.imdb.com/title/${show.imdbID}`}
                className="group"
                key={show.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-2 aspect-h-3 cursor-pointer overflow-hidden rounded-lg shadow-lg">
                  <Image
                    alt={show.title}
                    src={`https://image.tmdb.org/t/p/original/${show.imageID}.jpg`}
                    layout="fill"
                    className="transition-all group-hover:opacity-75"
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
