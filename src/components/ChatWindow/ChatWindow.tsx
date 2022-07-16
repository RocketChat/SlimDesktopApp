import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { useParams } from "react-router-dom";
import { realTimeLoginWithAuthToken } from "../../util/login.util";
import Header from './Header/Header';
import MessageForm from "./MessageForm/MessageForm";
import MessageList from './MessageList/MessageList';
import { loadMessagesFromRoom, realTimeSubscribeToRoom } from '../../util/chatsWindow.util';
import { RealtimeAPIMessage } from '../../interfaces/message';
import styled from "styled-components"

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`

const HeaderFooterContainer = styled.div`
  height: 4rem;
`

interface MessagesMap {
  [_id: string]: RealtimeAPIMessage
}

function ChatWindow() {
  const { id } = useParams();
  const [messages, setMessages] = useState<MessagesMap>({});
  const [messageToEdit, setMessageToEdit] = useState<RealtimeAPIMessage | null>(null);


  const loginToRoom = async () => {
    await realTimeLoginWithAuthToken();
    await realTimeSubscribe();
    await showMessages();
  }


  const processMessages = async(err:any, message:any, messageOptions:any) => {
    if(message.rid != id || err) return;
    await addMessage(message);
  }

  const realTimeSubscribe = async () => {
    await realTimeSubscribeToRoom(id, processMessages);
  }


  const showMessages = async () => {
    let lastMessageDate = null;
    let messagesKeys = Object.keys(messages);
    if(messagesKeys.length){
      lastMessageDate = messages[ messagesKeys[0] ].ts;
    }

    let newMessages: RealtimeAPIMessage[] = await loadMessagesFromRoom(id, 5, lastMessageDate);

    setMessages((oldMessages) => {
      let toBeMessages: MessagesMap = {};
      newMessages.map((message) => {
        toBeMessages[message._id] = message;
      });
      toBeMessages = {...toBeMessages, ...oldMessages};
      return toBeMessages;
    });
  }

  const addMessage = async (message: RealtimeAPIMessage) => {
    setMessages((oldMessages) => {
      let toBeMessages = {...oldMessages};
      toBeMessages[message._id] = message;
      return toBeMessages;
    });
  }

  const loadMoreMessages = async () => {
    showMessages();
  }

  const onEditMessageAction = (message: RealtimeAPIMessage) => {
    setMessageToEdit(message);
  }

  useEffect(() => {
    loginToRoom();
  }, []);


  return (
    <Container>
      <HeaderFooterContainer>
        <Header />
      </HeaderFooterContainer>
      <MessageList messages={messages} loadMoreMessages={loadMoreMessages} onEditMessageAction={onEditMessageAction} setMessageToEdit={setMessageToEdit} />
      <HeaderFooterContainer>
        <MessageForm messageToEdit={messageToEdit} setMessageToEdit={setMessageToEdit} />
      </HeaderFooterContainer>
    </Container>
  );
}

export default hot(ChatWindow);
