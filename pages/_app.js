import "../styles/global.css";

import { useEffect, useState } from "react";
import Head from "next/head";
import firebase from "firebase/app";
import Router, { useRouter } from "next/router";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { saveAccount, resetAccount } from "../features/user";
import { QueryClient, QueryClientProvider } from "react-query";
import TabBar from "../components/TabBar";
import { ReactQueryDevtools } from "react-query/devtools";
import AuthWrapper from "../components/AuthWrapper";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  // TODO: check if this page exists
  const isInAuthPath = pathname !== "/" && pathname !== "/login";

  return (
    <Provider store={store}>
      <AuthWrapper>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          {isInAuthPath && <TabBar />}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthWrapper>
    </Provider>
  );
}

export default MyApp;
