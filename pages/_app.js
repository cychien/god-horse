import "../styles/globals.css";
import initFirebase from "../utils/initFirebase";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initFirebase();
  }, [initFirebase]);

  return <Component {...pageProps} />;
}

export default MyApp;
