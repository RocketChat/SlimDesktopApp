import { driver } from "@rocket.chat/sdk"
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { useParams } from "react-router-dom";
import { realTimeLoginWithAuthToken } from "../../util/login.util";
import Header from './Header/Header';
import MessageForm from "./MessageForm/MessageForm";
import MessageList from './MessageList/MessageList';
import { loadMessagesFromRoom } from '../../util/chatsWindow.util';
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


function ChatWindow() {
  const { id } = useParams();
  const [messages, setMessages] = useState<RealtimeAPIMessage[]>([]);


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
    await driver.subscribeToMessages();
    await driver.reactToMessages( processMessages );
  }


  const showMessages = async () => {
    let lastMessageDate = null;
    if(messages.length){
      lastMessageDate = messages[0].ts;
    }

    let newMessages: RealtimeAPIMessage[] = await loadMessagesFromRoom(id, 10, lastMessageDate);
    setMessages((oldMessages) => [...newMessages, ...oldMessages]);
  }

  const addMessage = async (message: RealtimeAPIMessage) => {
    setMessages((oldMessages) => [...oldMessages, message]);
  }

  const loadMoreMessages = async () => {
    showMessages();
  }

  useEffect(() => {
    loginToRoom();
  }, []);


  return (
    <Container>
      <HeaderFooterContainer>
        <Header />
      </HeaderFooterContainer>
      <MessageList messages={messages} loadMoreMessages={loadMoreMessages} />
      <HeaderFooterContainer>
        <MessageForm />
      </HeaderFooterContainer>
    </Container>
  );
}

export default hot(ChatWindow);
