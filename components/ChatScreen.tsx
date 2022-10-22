import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from "@mui/icons-material/Mic";
import Message from "./Message";
import firebase  from "firebase/compat/app";
import { Firestore, Timestamp } from "firebase/firestore";
import React from "react";

export interface InputProps {
    input?: string;
    setInput: (inputs: string) => void;
};
interface Data{
  chat: string[];
  messages: string[];
}

export interface currentUser{
  email: string;
  lastSeen: Timestamp;
  photoUrl: string;
}

export function ChatScreen({ chat, messages }: any) {
 
  const [user] = useAuthState(auth as any);
  const [input, setInput] = React.useState("");
  
  const router = useRouter();
  const messagesByIdList = db
      .collection("chat")
      .doc(router.query.id as any)
      .collection("messages")
      .orderBy("timestamp", "asc")
  const [messagesSnapshot] = useCollection(messagesByIdList as any);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message key={message.id} user={message.data().user} message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime(), }} />
      ))
    } else {
      return JSON.parse(messages).map((message: { id: React.Key; user: currentUser; }) => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    
    };
  }
  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    //update lastSeen timestamp
    db.collection("users").doc(user?.uid as string).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    //add message to collection "messages" in database
    db.collection("chats").doc(router.query.id as any).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user?.email,
      photoUrl: user?.photoURL
    })

    setInput("");
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p> lastSeen</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>{showMessages()}<EndOfMessage /></MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage} />
        <MicIcon/>
      </InputContainer>
      
    </Container>
  );
}
  export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: grey;
  }
`;
const HeaderIcons = styled.div``;
const IconButton = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color:#e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 20px;
  position:sticky;
  bottom: 0;
  background-color: whitesmoke;
  outline: 0;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
`;