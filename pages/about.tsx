import Head from "next/head";
import Image from "next/legacy/image";
import PageTitle from "../components/PageTitle";
import me from "../public/images/me.jpg";

export default function About() {
  const title = "About Me - Parsa Mesgarha";
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
      <div className="prose dark:prose-invert px-6">
        <PageTitle name="About Me" />
        <div className="relative sm:flex sm:flex-row-reverse">
          <div className="mx-auto w-60 h-60 sm:w-full sm:h-full ">
            <Image className="rounded-full" src={me} alt="Parsa Mesgarha" />
          </div>
          <div className="prose dark:prose-invert mt-5 sm:mr-3 sm:mt-0">
            <p>
              My name&apos;s Parsa, and I&apos;m a 19 year old from London,
              England. Currently I&apos;m at Google as a Software Engineering{" "}
              <a
                href="https://buildyourfuture.withgoogle.com/apprenticeships"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Apprentice
              </a>
              , working on the{" "}
              <a
                href="https://web.dev/"
                rel="prefetch noreferrer"
                target="_blank"
              >
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
              .
            </p>
            <p>
              This page is intended to paint a picture of the type of person I
              am, so if anything on here resonates with you, don&apos;t hesitate
              to reach out on either{" "}
              <a
                href="https://twitter.com/pzrsaa"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Twitter
              </a>
              , Discord (<b>parsa#1055</b>) or{" "}
              <a href="mailto:hi@parsam.io">Email</a> (<b>hi@parsam.io</b>).
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-3 mt-8">Likes</h1>
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
              Typing, especially via tests on{" "}
              <a
                href="https://monkeytype.com/profile/pzrsa"
                rel="prefetch noreferrer"
                target="_blank"
              >
                monkeytype
              </a>
              . My personal record is currently 133 wpm.
            </li>
            <li>
              Mechanical watches and G-Shock&apos;s. I own a Seiko{" "}
              <a href="/images/articles/2022-photos/seiko.jpg" target="_blank">
                SNZG13K1
              </a>{" "}
              and a G-Shock{" "}
              <a
                href="https://www.casio.com/intl/watches/gshock/product.GA-B2100-1A1/"
                rel="prefetch noreferrer"
                target="_blank"
              >
                GA-B2100-1A1
              </a>
              . I love how boringly beautiful they are, which makes me feel good
              wearing them.
            </li>
            <li>
              Vi keybinds, I can&apos;t live without them as it simply makes
              interacting with the computer a joy.
            </li>
            <li>
              Consuming <i>informational</i> content at 2x speed.{" "}
              <a
                href="https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk?hl=en"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Video Speed Controller
              </a>{" "}
              has completely changed the way I watch videos. And yes, I watch
              other stuff at normal speed, I&apos;m not a psycho.
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-3 mt-8">More Links</h1>
          <p>
            This is just a place I can safely dump links of me on the internet:
          </p>
          <ul>
            <LinkItem href="https://www.youtube.com/@pzrsa" name="YouTube" />
            <LinkItem
              href="https://news.ycombinator.com/user?id=pzrsa"
              name="HN"
            />
            <li>
              <a
                href="https://mastodon.social/@pzrsa"
                rel="prefetch noreferrer me"
              >
                Mastodon
              </a>
            </li>
            <LinkItem href="https://medium.com/@pzrsa" name="Medium" />
            <LinkItem
              href="https://stackoverflow.com/users/14889706/pzrsa"
              name="Stack Overflow"
            />
            <LinkItem
              href="https://monkeytype.com/profile/pzrsa"
              name="Monkeytype"
            />
            <LinkItem href="https://www.goodreads.com/pzrsa" name="Goodreads" />
          </ul>
        </div>
      </div>
    </>
  );
}

interface LinkItemProps {
  href: string;
  name: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, name }) => {
  return (
    <li>
      <a href={href} rel="prefetch noreferrer" target="_blank">
        {name}
      </a>
    </li>
  );
};
