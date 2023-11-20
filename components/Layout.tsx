import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import {
  SiGit,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from "react-icons/si";
import { FONT_BRICOLAGE } from "../lib/constants";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const title = "Parsa Mesgarha";
  const description =
    "Parsa Mesgarha - Programmer, lifelong learner. Documenting my journey.";
  const image = "/images/me.jpg";

  return (
    <div className={`max-w-2xl mx-auto my-8 ${FONT_BRICOLAGE.className}`}>
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
          {pathname === "/" ? (
            <span className="font-bold text-xl sm:text-2xl cursor-default p-2">
              Parsa Mesgarha
            </span>
          ) : (
            <Link
              href={"/"}
              className="font-bold text-xl sm:text-2xl hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
            >
              Parsa Mesgarha
            </Link>
          )}
        </span>
        {pathname === "/blog" ? (
          <span className="font-bold sm:text-lg cursor-default p-2">blog</span>
        ) : (
          <Link
            href={"/blog"}
            className="font-bold sm:text-lg hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
          >
            blog
          </Link>
        )}
      </nav>
      <main>{children}</main>
      <footer className="flex flex-row gap-1 mt-6 px-4 justify-center">
        <FooterItem href="https://twitter.com/pzrsaa" Icon={SiTwitter} />
        <FooterItem href="https://github.com/pzrsa" Icon={SiGithub} />
        <FooterItem
          href="https://www.instagram.com/parsamesgarha"
          Icon={SiInstagram}
        />
        <FooterItem
          href="https://www.linkedin.com/in/parsamesgarha"
          Icon={SiLinkedin}
        />
        <FooterItem href="https://github.com/pzrsa/parsam.io" Icon={SiGit} />
      </footer>
    </div>
  );
};

const FooterItem: React.FC<{ href: string; Icon: IconType }> = ({
  href,
  Icon,
}) => {
  return (
    <a
      className="text-lg sm:text-xl hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      {<Icon />}
    </a>
  );
};

export default Layout;
