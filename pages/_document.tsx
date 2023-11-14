import Document, { Head, Html, Main, NextScript } from "next/document";
import { FONT_SOURCE_SERIF } from "../lib/constants";

export default class ParsaDocument extends Document {
  render() {
    return (
      <Html
        lang="en"
        className="bg-white dark:bg-black text-black dark:text-white"
      >
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <meta name="theme-color" content="#111111" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
