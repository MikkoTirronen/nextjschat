import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import Message from "./Message";
import firebase from "firebase/compat/app";
import { Timestamp } from "firebase/firestore";
import React from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { getAuth } from "firebase/auth";

export interface Data {
  chat: { users: { [key: number]: number; email: string } };
  messages: string;
}

export type currentUser = {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
};

export function ChatScreen({ chat, messages }: Data) {
  const [user] = useAuthState(getAuth());
  const [input, setInput] = React.useState("");

  const router = useRouter();

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id as string)
      .collection("messages")
      .orderBy("timestamp", "asc") as any
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user)) as any
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map(
        (message: { id: React.Key; user: currentUser }) => (
          <Message key={message.id} user={message.user} message={message} />
        )
      );
    }
  };
  const sendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //update lastSeen timestamp
    db.collection("users")
      .doc(user?.uid as string)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    //add message to collection "messages" in database
    db.collection("chats")
      .doc(router.query.id as string)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user?.email,
        photoURL: user?.photoURL,
      });

    setInput("");
  };

  return (
    <Container>
      <Header>
        {recipient && recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          ) : (
            "loading"
          )}
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
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage} />
        <MicIcon />
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
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
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
  bottom: 0;
`;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 20px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  outline: 0;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
`;
