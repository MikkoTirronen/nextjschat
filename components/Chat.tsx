import React from "react";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar } from "@mui/material";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { NextRouter, useRouter } from "next/router";
import { DocumentData, Timestamp } from "firebase/firestore";

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

export interface user {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
}
function Chat({ id, users }: { id: string; users: [user] }) {
  const router: NextRouter = useRouter();

  const [user] = useAuthState(auth as any);

  // const recipientChatRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
  // db.collection("users").where("email", "==", getRecipientEmail(users, user));

  const [recipientSnapshot] = useCollection(
    // recipientChatRef as any
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(users, user)) as any
  );

  const recipientEmail: string = getRecipientEmail(users, user);

  const recipient: DocumentData | undefined =
    recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={`${recipient?.photoURL}`} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;
