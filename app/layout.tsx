import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { IconType } from "react-icons";
import { SiGit, SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import Nav from "./components/Nav";
import "./globals.css";
import { FONT_BRICOLAGE } from "./lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://parsam.io"),
  title: {
    template: "%s - Parsa Mesgarha",
    default: "Parsa Mesgarha",
  },
  description: "Parsa Mesgarha",
  openGraph: {
    url: "https://parsam.io",
    images: ["https://parsam.io/images/og/index.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@pzrsaa",
    images: ["https://parsam.io/images/og/index.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-black text-black dark:text-white ${FONT_BRICOLAGE.className}`}
    >
      <body className={`max-w-2xl mx-auto my-8`}>
        <Analytics />
        <Nav />
        <main>{children}</main>
        <footer className="flex flex-row gap-1 mt-6 px-4 justify-center">
          <FooterItem href="https://twitter.com/pzrsaa" Icon={SiX} />
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
      </body>
    </html>
  );
}

const FooterItem: React.FC<{ href: string; Icon: IconType }> = ({
  href,
  Icon,
}) => {
  return (
    <a
      className="text-lg sm:text-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-sm p-2"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      {<Icon />}
    </a>
  );
};
