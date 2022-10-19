import { Avatar, Button, IconButton } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../components/Chat";


function SideBar() {
  const [user] = useAuthState(auth as any );

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);

  const [chatsSnapshot] = useCollection(userChatRef as any);

  const createChat = () => {
    const input = prompt("Please enter your target email address");
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user?.email
    ) {
      //add chat to DB "chats" collection
      db.collection("chats").add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail: string) => {
   return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: string) => user === recipientEmail)
          ?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} src={user?.photoURL as string } />
        <IconContainer>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>

      {/*Chat List Goes Here */}
      {chatsSnapshot?.docs.map((chat) => (
       <Chat
          key={chat.id}
          id={chat.id}
        users={chat.data().users}/>
     ))}
    </Container>
  );
}

export default SideBar;
const SideBarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;
const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
