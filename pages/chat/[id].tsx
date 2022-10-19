import React, { Context } from "react";
import Head from "next/head";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import ChatScreen from "../../components/ChatScreen";
import {db, auth} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { GetServerSideProps } from "next";

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;
::-webkit-scrollbar { display: none;}
-ms-overflow-style: none;
scrollbar-width: none;
`

function Chat({ chat, messages }) {
    const [user] = useAuthState(auth as any)
  return (
    <Container>
      <Head>
              <title>Chat with {getRecipientEmail(chat?.users, user)}</title>
      </Head>
      <SideBar />
          <ChatContainer>
        <ChatScreen chat ={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps (context: { query: { id: any; }; }) {
    const ref =  db.collection("chats").doc(context.query.id as any);
    console.log( ref)
    //prep messages
    const messagesRes = await ref.collection("messages").orderBy("timestamp", "asc").get();
    console.log(messagesRes)
    const messages: any = messagesRes.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime()    
    }))
    //prep the chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    console.log(chat, messages)
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}