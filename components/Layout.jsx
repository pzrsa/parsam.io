import Head from "next/head";
import styles from "../styles/modules/Layout.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

export const siteTitle = "Parsa Mesgarha";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta property="og:image" content="/images/avatar.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
