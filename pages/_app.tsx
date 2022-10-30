import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
};

export default App;
