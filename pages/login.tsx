import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
  background-color: whitesmoke;;
`;
const LoginContainer = styled.div`
padding: 100px;
align-items: center;
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;

function login() {
    const signIn = () => {
        
            //signInWithPopup(provider).catch(alert)
    }
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
              <Button onClick={signIn} variant="outlined">Sign in with Google!</Button>
      </LoginContainer>
    </Container>
  );
}

export default login;