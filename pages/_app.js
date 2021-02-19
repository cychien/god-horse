import "../styles/global.css";
import initFirebase from "../utils/initFirebase";
import { useEffect, useState } from "react";
import Head from "next/head";
import firebase from "firebase/app";
import Router from "next/router";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { saveEmail } from "../features/user";
import { QueryClient, QueryClientProvider } from "react-query";

initFirebase();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (user.email) {
          store.dispatch(saveEmail(user.email));
        }
        Router.push("/home");
      } else {
        Router.push("/login");
      }
    });
  }, [firebase]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
