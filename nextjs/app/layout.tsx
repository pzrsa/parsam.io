import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Nav from "./components/Nav";
import "./globals.css";
import { INDEX_OG_PATH } from "./lib/constants";
import { Courier_Prime } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://parsam.io"),
  title: {
    template: "%s - Parsa Mesgarha",
    default: "Parsa Mesgarha - Software Engineer at Tesla",
  },
  description: "Parsa Mesgarha - Software Engineer at Tesla",
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

const courierPrime = Courier_Prime({
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
      className={`bg-white text-black antialiased ${courierPrime.className}`}
    >
      <body className={`max-w-2xl mx-auto py-8 px-6`}>
        <Analytics />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
