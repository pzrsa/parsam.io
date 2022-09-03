import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const title = "Parsa Mesgarha - Programmer, lifelong learner.";
  const description =
    "Parsa Mesgarha - Programmer, lifelong learner. Documenting my journey.";
  const image = "/images/me.jpg";

  return (
    <div className="max-w-2xl mx-auto px-6 my-8">
      <Head>
        <meta name="robots" content="all" />
        <meta content={description} name="description" />
        <meta property="og:url" content={`https://parsam.io${router.asPath}`} />
        <link rel="canonical" href={`https://parsam.io${router.asPath}`} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://parsam.io${image}`}
          key="og:image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_parsam" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://parsam.io${image}`}
          key="twitter:image"
        />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
