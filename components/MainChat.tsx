import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { db, auth, app } from "../firebase";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import Message from "./Message";
import firebase from "firebase/compat/app";
import React from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { currentUser } from "./ChatScreen";

function MainChat({ mainMessages }: any) {
  const [user] = useAuthState(getAuth());
  const [input, setInput] = React.useState("");

  //   const [messagesSnapshot] =() => useCollection();
  //   //  db
  //       .collection("mainchat")
  //       .doc(router.query.id as string)
  //       .collection("messages")
  //       .orderBy("timestamp", "asc") as any

  const FirestoreCollection = () => {
    const [value, loading, error] = useCollection(collection(db, "mainchat"), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && !loading && (
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
        )}
      </div>
    );
  };

//   const showMessages = () => {
//     if (messagesSnapshot) {
//       return messagesSnapshot.docs.map((message) => (
//         <Message
//           key={message.id}
//           user={message.data().user}
//           message={{
//             ...message.data(),
//             timestamp: message.data().timestamp,
//           }}
//         />
//       ));
//     } else {
//       return JSON.parse(mainMessages).map(
//         (message: { id: React.Key; user: currentUser }) => (
//           <Message key={message.id} user={message.user} message={message} />
//         )
//       );
//     }
//   };
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
