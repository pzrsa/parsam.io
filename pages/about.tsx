import Head from "next/head";
import Image from "next/image";
import PageTitle from "../components/PageTitle";
import { albums } from "../data/music";
import me from "../public/images/me.jpg";

const About: React.FC = ({ }) => {
  const title = "About Me - Parsa Mesgarha";
  const image = "about.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io/images/og/${image}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:image"
          content={`https://parsam.io/images/og/${image}`}
          key="twitter:image"
        />
      </Head>
      <div className="prose dark:prose-invert">
        <PageTitle name="About Me" />
        <div className="relative sm:flex sm:flex-row-reverse">
          <div className="mx-auto w-60 h-60 sm:w-full sm:h-full ">
            <Image className="rounded-full" src={me} alt="Parsa Mesgarha" />
          </div>
          <div className="prose dark:prose-invert mt-5 sm:mr-3 sm:mt-0">
            <p>
              If you&apos;re interested to learn more about me for some reason,
              here&apos;s a list of things that might paint a picture of the
              type of person I am.
            </p>
            <p>
              These things bring joy to my life, and there could be someone out
              there who has similar interests. If thats the case, feel free to
              reach out on{" "}
              <a
                href="https://twitter.com/pzrsaa"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Twitter
              </a>{" "}
              as I like meeting new people.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3 mt-8">I Like</h2>
          <ul>
            <li>
              <a
                href="https://github.com/pzrsa?tab=stars"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Open source projects
              </a>
              . It&apos;s fascinating that random people all over the internet
              are able to come together to change the world.
            </li>
            <li>
              Reading{" "}
              <a
                href="https://www.goodreads.com/review/list/125053326?page=1&shelf=%23ALL%23"
                rel="prefetch noreferrer"
                target="_blank"
              >
                books
              </a>{" "}
              on my Kindle Paperwhite.
            </li>
            <li>
              Mechanical keyboards. I use a keyboard daily, so it makes sense
              for me to invest in tools that inspire me to use them more.
            </li>
            <li>
              Doing typing tests on{" "}
              <a
                href="https://monkeytype.com/profile/PiD5IrU9SsdiY6c2yDMUq72wigz1"
                rel="prefetch noreferrer"
                target="_blank"
              >
                monkeytype
              </a>
              . My current personal record is 133wpm.
            </li>
            <li>
              Mechanical watches and G-Shock&apos;s. I own a Seiko SNZG13K1 and
              a G-Shock GA-B2100-1A1, both of which I bought for under £100. I
              just love how minimal they are which makes me feel good wearing
              them.
            </li>
            <li>
              Vi keybinds, I can&apos;t live without them as it simply makes
              interacting with the computer a joy.
            </li>
            <li>
              Consuming informational content at 2x speed.{" "}
              <a
                href="https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk?hl=en"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Video Speed Controller
              </a>{" "}
              has completely changed the way I watch videos. I of course watch
              movies and shows at normal speed, I&apos;m not a psycho.
            </li>
            <li>
              Building things from scratch (within my capabilities) before
              buying it. It&apos;s a nice feeling when something has your own
              battle scars from making some mistakes.
            </li>
          </ul>
          <h2 className="text-2xl font-bold mb-3 mt-8">Music</h2>
          <p>
            I&apos;m a big{" "}
            <a
              href="https://en.wikipedia.org/wiki/Kanye_West"
              rel="prefetch noreferrer"
              target="_blank"
            >
              Ye
            </a>{" "}
            and{" "}
            <a
              href="https://en.wikipedia.org/wiki/Kendrick_Lamar"
              rel="prefetch noreferrer"
              target="_blank"
            >
              Kendrick
            </a>{" "}
            fan, but if you want to see the other artists I listen to (yes, they
            exist), you can check my{" "}
            <a
              href="https://open.spotify.com/user/e4ebkdi70a4wu03jwbwrglzhk"
              rel="prefetch noreferrer"
              target="_blank"
            >
              Spotify profile
            </a>
            . Clearly my music choice is not that diverse, but I enjoy keeping
            it that way.
          </p>
          <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:grid-cols-3">
            {albums.map((album) => (
              <a
                href={album.url}
                className="group"
                key={album.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    alt={album.title}
                    src={album.image}
                    layout="fill"
                    className="group-hover:opacity-75 transition-all"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
