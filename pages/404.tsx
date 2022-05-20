import Head from "next/head";

const Custom404: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 - Parsa Mesgarha</title>
      </Head>
      <h1 className="text-center text-2xl sm:text-4xl font-black">
        404 - Page not found
      </h1>
    </>
  );
};

export default Custom404;
