import Head from "next/head";
import { useEffect } from "react";
import firebase from "firebase/app";
import initFirebase from "../utils/initFirebase";
import styled from "styled-components";

export default function Login() {
  return (
    <Container>
      <Head>
        <title>神駒團 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>神駒團 App</Title>
      <ButtonWrapper>
        <Button
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase
              .auth()
              .signInWithPopup(provider)
              .then((result) => {
                const user = result.user;
                console.log(user.email);
              })
              .catch((error) => {
                console.log(error.message);
              });
          }}
        >
          登入
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #343a40;
  letter-spacing: 1px;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 12px 24px;
  padding-right: 18px;
  background: #21a4f4;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: #fff;
  letter-spacing: 6px;
`;
