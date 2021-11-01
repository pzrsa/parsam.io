import Head from "next/head";
import styles from "../styles/modules/Layout.module.css";
import Navbar from "./Navbar";

export const siteTitle = "parsa";

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
    </div>
  );
};

export default Layout;
