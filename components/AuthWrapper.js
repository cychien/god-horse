import React, { useEffect } from "react";
import initFirebase from "../utils/initFirebase";
import { saveAccount, resetAccount } from "../features/user";
import firebase from "firebase/app";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";

function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = router.pathname;
  const isInAuthPath = pathname !== "/" && pathname !== "/login";
  const dispatch = useDispatch();

  useEffect(() => {
    initFirebase();

    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // TODO: get ID TOken
        // ref: https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
        dispatch(
          saveAccount({
            name: user.displayName || "",
            email: user.email || "",
            // TODO: replace with real admin
            role:
              user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
                ? "admin"
                : "participant",
          })
        );
        if (!isInAuthPath) {
          // TODO: navigate to home page
          Router.push("/bike");
        }
      } else {
        dispatch(resetAccount());
        Router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [initFirebase, firebase, isInAuthPath, dispatch, Router]);

  useEffect(() => {
    router.prefetch("/bike");
    router.prefetch("/login");
  }, []);

  return <>{children}</>;
}

export default AuthWrapper;
