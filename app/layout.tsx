import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { IconType } from "react-icons";
import {
  SiGit,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import Nav from "./components/Nav";
import "./globals.css";
import { INDEX_OG_PATH } from "./lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://parsam.io"),
  title: {
    template: "%s - Parsa Mesgarha",
    default: "Parsa Mesgarha",
  },
  description: "Parsa Mesgarha",
  openGraph: {
    url: "https://parsam.io",
    images: [INDEX_OG_PATH],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@pzrsaa",
    images: [INDEX_OG_PATH],
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
      className={`bg-white dark:bg-black text-black dark:text-white antialiased`}
    >
      <body className={`max-w-2xl mx-auto my-8`}>
        <Analytics />
        <Nav />
        <main>{children}</main>
        <footer className="flex flex-row gap-1 mt-6 px-4 justify-center">
          <FooterItem href="https://twitter.com/pzrsaa" Icon={SiX} />
          <FooterItem href="https://github.com/pzrsa" Icon={SiGithub} />
          <FooterItem href="https://www.youtube.com/@pzrsa" Icon={SiYoutube} />
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
      className="text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-sm p-2"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      <Icon />
    </a>
  );
};
