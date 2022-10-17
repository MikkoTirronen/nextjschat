import { Avatar, Button, IconButton } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";


function SideBar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
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
              <SearchInput placeholder="Search in chats"/>
          </Search>
          <SideBarButton onClick={createChat} >Start a new chat</SideBarButton>

          {/*Chat List Goes Here */}
    </Container>
  );
}

export default SideBar;
const SideBarButton = styled(Button)`
width:100%;
border-top:1px solid whitesmoke;
  border-bottom:1px solid whitesmoke;
`
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
  border-bottom: 1px solid whitesmoke
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
    :hover{
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
`