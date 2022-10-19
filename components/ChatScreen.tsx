import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function ChatScreen({ chats, messages }) {
  const [user] = useAuthState(auth as any);
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
      <MessageContainer>{/* show messages*/}</MessageContainer>
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
const MessageContainer = styled.div``;