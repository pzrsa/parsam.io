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
    <div className="max-w-2xl mx-auto px-6 my-8">
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
      <nav className="flex flex-wrap gap-4 mb-6">
        <NavLink href="/" text="index" />
        <NavLink href="/about" text="about" />
        <NavLink href="/notes" text="notes" />
        <NavLink href="/articles" text="articles" />
        <NavLink href="/feeds" text="feeds" />
      </nav>
      <main>{children}</main>
      <footer className="grid grid-cols-3 sm:flex-row sm:flex gap-4 mt-10">
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

const NavLink: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="font-bold font-mono hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-md sm:text-lg items-center justify-center flex"
    >
      {text}
    </Link>
  );
};

const FooterItem: React.FC<{ href: string; name: string }> = ({
  href,
  name,
}) => {
  return (
    <a
      className="font-mono font-bold text-md sm:text-lg  hover:text-neutral-500 dark:hover:text-neutral-400 transition-all"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      {name}
    </a>
  );
};

export default Layout;
