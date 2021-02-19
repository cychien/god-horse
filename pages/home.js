import Head from "next/head";
import firebase from "firebase/app";
import Router from "next/router";
import { useEffect } from "react";
import initFirebase from "../utils/initFirebase";

initFirebase();

export default function Home() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("sign in");
      } else {
        console.log("please sign in");
      }
    });
  }, [firebase]);

  return (
    <div>
      <Head>
        <meta
          name="google-signin-client_id"
          content="591759890255-8h83gs8cl0k9r446ufaehtk7p8i6t437.apps.googleusercontent.com"
        />
        <meta name="google-signin-cookiepolicy" content="single_host_origin" />
        <meta name="google-signin-scope" content="profile email" />
      </Head>
      123
      <button
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              var auth2 = gapi.auth2.getAuthInstance();
              auth2.signOut().then(function () {
                location.href = "/";
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        sign out
      </button>
    </div>
  );
}
