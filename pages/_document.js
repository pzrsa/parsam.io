import Document, { Head, Html, Main, NextScript } from "next/document";

class ParsaDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://avatars.githubusercontent.com/u/76453314"
            rel="shortcut icon"
          />
          <meta name="description" content="Parsa's Personal Website." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ParsaDocument;
