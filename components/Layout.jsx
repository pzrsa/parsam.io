import Head from "next/head";
import utilStyles from "../styles/modules/Layout.module.css";
import NavBar from "./NavBar";

export const siteTitle = "parsa";

const Layout = ({ children }) => {
  return (
    <div className={utilStyles.container}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
