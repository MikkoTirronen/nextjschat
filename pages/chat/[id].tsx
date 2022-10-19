import React from "react";
import Head from "next/head";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import ChatScreen from "../../components/ChatScreen";

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`

`

function Chat() {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <SideBar />
          <ChatContainer>
              <ChatScreen></ChatScreen>
      </ChatContainer>
    </Container>
  );
}

export default Chat;
