import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/modules/Layout.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  const title = "Parsa Mesgarha - Programmer, lifelong learner.";
  const description =
    "Parsa Mesgarha - Programmer, lifelong learner. Documenting my journey.";
  const image = "/images/avatar.jpg";

  return (
    <div className={styles.container}>
      <Head>
        <meta name="robots" content="all" />
        <meta content={description} name="description" />
        <meta property="og:url" content={`https://parsam.io${router.asPath}`} />
        <link rel="canonical" href={`https://parsam.io${router.asPath}`} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:image" content={image} key="og:image" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_parsam" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} key="twitter:image" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
