import "../styles/global.css";
import initFirebase from "../utils/initFirebase";
import { useEffect, useState } from "react";
import Head from "next/head";
import firebase from "firebase/app";
import Router from "next/router";

initFirebase();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        Router.push("/home");
      } else {
        Router.push("/login");
      }
    });
  }, [firebase]);

  return <Component {...pageProps} />;
}

export default MyApp;
