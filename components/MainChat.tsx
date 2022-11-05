import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { db } from "../firebase";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import Message from "./Message";
import firebase from "firebase/compat/app";
import React, { useRef } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import Loading from "./Loading";
import scrollToBottom from "../utils/scrollToBottom";

function MainChat({ mainMessages }: any) {
  const [user] = useAuthState(getAuth());
  const [input, setInput] = React.useState("");
  const mostRecentMessage = useRef<HTMLDivElement>(null!);

  const FirestoreCollection = ()=> {
    const [value, loading, error] = useCollection(
      query(collection(db, "mainchat"), orderBy("timestamp", "asc"))
    );

    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <Loading />}
        {value && !loading && (
          <>
            <span>
              {value.docs.map((doc) => (
                <Message
                  key={doc.id}
                  user={doc.data().user}
                  message={{
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate().getTime(),
                  }}
                  
                ></Message>
                
              ))}
            </span>
            {value && !loading && scrollToBottom(mostRecentMessage)}
          </>
        )}
      </div>
    );
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
    db.collection("mainchat").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user?.email,
      photoURL: user?.photoURL,
    });

    setInput("");
    scrollToBottom(mostRecentMessage);
  };

  return (
    <Container>
      <Header>
        <HeaderInformation>
          <h3>Chat In A Box: ChatterBox</h3>
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
        {FirestoreCollection()}
        <EndOfMessage ref={mostRecentMessage} />
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

export default MainChat;
const Container = styled.div`
  background-color: #d51313;
  height: 100vh;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
    text-align: center;
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
const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

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
