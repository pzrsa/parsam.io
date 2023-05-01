import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const title = "Parsa Mesgarha - Programmer, lifelong learner.";
  const description =
    "Parsa Mesgarha - Programmer, lifelong learner. Documenting my journey.";
  const image = "/images/me.jpg";

  return (
    <div className="max-w-2xl mx-auto my-8">
      <Head>
        <meta name="robots" content="all" />
        <meta content={description} name="description" />
        <meta property="og:url" content={`https://parsam.io${router.asPath}`} />
        <link rel="canonical" href={`https://parsam.io${router.asPath}`} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io${image}`}
          key="og:image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pzrsaa" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io${image}`}
          key="twitter:image"
        />
      </Head>
      <nav className="flex mb-6 gap-1 px-4 items-center">
        <span className="flex-1">
          <Link
            href={"/"}
            className="font-bold text-xl sm:text-2xl hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
          >
            Parsa Mesgarha
          </Link>
        </span>
        <Link
          href={"/about"}
          className="font-bold font-mono sm:text-lg hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
        >
          about
        </Link>
        <a
          href="/feed.atom"
          className="font-bold sm:text-lg hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
        >
          rss
        </a>
      </nav>
      <main>{children}</main>
      <footer className="grid grid-cols-3 sm:flex sm:flex-row gap-1 mt-6 px-4">
        <FooterItem href="https://github.com/pzrsa" name="github" />
        <FooterItem href="https://twitter.com/pzrsaa" name="twitter" />
        <FooterItem
          href="https://www.linkedin.com/in/parsamesgarha/"
          name="linkedin"
        />
        <FooterItem href="https://parsam.substack.com/" name="substack" />
        <FooterItem href="https://github.com/pzrsa/parsam.io" name="source" />
      </footer>
    </div>
  );
};

const FooterItem: React.FC<{ href: string; name: string }> = ({
  href,
  name,
}) => {
  return (
    <a
      className="font-bold font-mono sm:text-lg hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      {name}
    </a>
  );
};

export default Layout;
