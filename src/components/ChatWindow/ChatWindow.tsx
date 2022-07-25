import React, { useEffect, useState, useRef } from "react";
import { hot } from "react-hot-loader/root";
import { useParams } from "react-router-dom";
import { realTimeLoginWithAuthToken } from "../../util/login.util";
import Header from "./Header/Header";
import MessageForm from "./MessageForm/MessageForm";
import MessageList from "./MessageList/MessageList";
import { loadMessagesFromRoom, realTimeSubscribeToRoom, markRoomAsRead } from "../../util/chatsWindow.util";
import { RealtimeAPIMessage } from "../../interfaces/message";
import { DDPMessage } from "../../interfaces/sdk";
import styled from "styled-components"
import { MESSAGES_LOAD_PER_REQUEST } from "../../constants";

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

const isInViewport = (element: HTMLElement | null, offset = 0) => {
  if (!element) return false;
  const top = element.getBoundingClientRect().top;
  return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
}

function ChatWindow() {
  const { id } = useParams();
  const bottomRef = useRef<null | HTMLElement>(null);
  const [messages, setMessages] = useState<MessagesMap>({});
  const [messageToEdit, setMessageToEdit] = useState<RealtimeAPIMessage | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);


  const loginToRoom = async () => {
    await realTimeLoginWithAuthToken();
    await realTimeSubscribe();
    await showMessages();
    await markRoomAsRead(id); // TODO:: check if window is focused
    setLoaded(true);
  }




  const processMessages = async(ddpMessage:DDPMessage) => {
    const message = ddpMessage.fields.args[0];

    let scroll: boolean = false;
    // Check if user is already at down of page then scroll to show message
    if(isInViewport(bottomRef.current)){
      scroll = true;
    }

    await addMessage(message);
    if(scroll) bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    await markRoomAsRead(id);
  }

  const realTimeSubscribe = async () => {
    await realTimeSubscribeToRoom(id || "", processMessages);
  }

  const showMessages = async () => {
    let lastMessageDate = null;
    let messagesKeys = Object.keys(messages);
    if(messagesKeys.length){
      lastMessageDate = messages[ messagesKeys[0] ].ts;
    }

    const newMessagesResponse: {messages: RealtimeAPIMessage[], unreadNotLoaded: number} = await loadMessagesFromRoom(id, MESSAGES_LOAD_PER_REQUEST, lastMessageDate);
    const newMessages = newMessagesResponse.messages;

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


  return loaded && (
    <Container>
      <HeaderFooterContainer>
        <Header />
      </HeaderFooterContainer>
      <MessageList messages={messages}
        loadMoreMessages={loadMoreMessages}
        onEditMessageAction={onEditMessageAction}
        setMessageToEdit={setMessageToEdit}
      />
      <div ref={bottomRef} />
      <HeaderFooterContainer>
        <MessageForm messageToEdit={messageToEdit} setMessageToEdit={setMessageToEdit} />
      </HeaderFooterContainer>
    </Container>
  );
}

export default hot(ChatWindow);
