import Head from "next/head";

export default function Custom404() {
  const title = "404 - Parsa Mesgarha";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="text-center text-2xl sm:text-4xl font-black">
        404 - Page not found
      </h1>
    </>
  );
}
