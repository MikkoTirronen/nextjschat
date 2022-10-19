import React from "react";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar } from "@mui/material";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { connectFirestoreEmulator, DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";

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

function Chat({ id, users }: { id: string, users: object }) {
  const router = useRouter();
  const [user] = useAuthState(auth as any);

  const recipientChatRef = db
    .collection("users")
    .where("email", "==", getRecipientEmail(users, user));
  const [recipientSnapshot] = useCollection(recipientChatRef as any);

  const recipientEmail: string = getRecipientEmail(users, user);

  const recipient = recipientSnapshot?.docs?.[0]?.data();
 
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={`${recipient?.photoUrl}`} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;
