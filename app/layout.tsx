import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Nav from "./components/Nav";
import "./globals.css";
import { INDEX_OG_PATH } from "./lib/constants";
import { IBM_Plex_Serif } from "next/font/google";

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

const ibm = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-black text-black dark:text-white antialiased ${ibm.className}`}
    >
      <body className={`max-w-2xl mx-auto py-8 px-6`}>
        <Analytics />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
