import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase';
import moment from 'moment';
import { currentUser } from './ChatScreen';



function Message({user, message, timestamp }: any) {
    const [userLoggedIn] = useAuthState(auth as any)                                                                ;

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Receiver;
  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LLLL") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message

const Container = styled.div``
const MessageElement = styled.div`
width: fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
min-width: 200px;
padding-bottom: 26px;
position: relative;
text-align: right;`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`
const Receiver = styled(MessageElement)`
background-color: whitesmoke;
text-align: left;
`
const Timestamp = styled.span`
  color: grey;
  padding: 10px;
  font-size: 11px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`
interface userMessage{
  message: { message: string; user: string; timestamp: any };
  user: currentUser | string;
}