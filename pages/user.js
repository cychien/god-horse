import firebase from "firebase/app";
import React from "react";
import Router from "next/router";
import { resetTicket } from "../features/ticket";
import { resetAccount } from "../features/user";
import { useDispatch, useSelector } from "react-redux";

function User() {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -40%)",
      }}
    >
      <button
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              dispatch(resetAccount());
              dispatch(resetTicket());
              Router.push("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        登出
      </button>
    </div>
  );
}

export default User;
