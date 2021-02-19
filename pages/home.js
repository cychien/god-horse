import Head from "next/head";
import firebase from "firebase/app";
import Router from "next/router";
import { useEffect } from "react";
import initFirebase from "../utils/initFirebase";

export default function Home() {
  return (
    <div>
      <button
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              Router.push("login");
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
