import React, { useEffect, useState, useRef } from "react";
import { hot } from "react-hot-loader/root";
import { useParams } from "react-router-dom";
import { realTimeLoginWithAuthToken } from "../../util/login.util";
import Header from "./Header/Header";
import MessageForm from "./MessageForm/MessageForm";
import MessageList from "./MessageList/MessageList";
import { loadMessagesFromRoom, realTimeSubscribeToRoom, markRoomAsRead, loadMessagesFromThread } from "../../util/chatsWindow.util";
import { RealtimeAPIMessage } from "../../interfaces/message";
import { DDPMessage } from "../../interfaces/sdk";
import styled from "styled-components"
import { MESSAGES_LOAD_PER_REQUEST } from "../../constants";
import { useSelector } from "react-redux";

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: unset;
`

const HeaderFooterContainer = styled.div`
  height: 4rem;
`

interface MessagesMap {
  [_id: string]: RealtimeAPIMessage
}

/**
 * @returns if element is in the view of user
 */
const isInViewport = (element: HTMLElement | null, offset = 0) => {
  if (!element) return false;
  const top = element.getBoundingClientRect().top;
  return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
}

/**
 *
 * @param props.isThread returns true if view should be thread
 * @returns Either Complete Chat Window (Like Channel) or Thread View
 */

function ChatWindow(props: {isThread: boolean}) {
  const id = useParams().id;
  const bottomRef = useRef<null | HTMLElement>(null);
  const [messages, setMessages] = useState<MessagesMap>({});
  const [messageToEdit, setMessageToEdit] = useState<RealtimeAPIMessage | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  const thread = useSelector((state: any) => state.thread);
  const tmid = thread.tmid;

  const loginToRoom = async () => {
    await realTimeLoginWithAuthToken();
    await realTimeSubscribe();
    await showMessages();
    await markRoomAsRead(id); // TODO:: check if window is focused
    setLoaded(true);
    // Auto Scroll to bottom when chat opens
    scrollToBottom("auto");
  }

  const loginToThread = async () => {
    await realTimeSubscribe();
    await showMessages();
    setLoaded(true);
    // Auto Scroll to bottom when chat opens
    scrollToBottom("auto");
  }

  const scrollToBottom = (type: string = "smooth") => {
    if(type == "smooth") bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    else bottomRef.current?.scrollIntoView({behavior: 'auto'})
  }

  const processMessages = async(ddpMessage:DDPMessage) => {
    const message: RealtimeAPIMessage = ddpMessage.fields.args[0];
    if(message.tmid && !props.isThread || message.tmid != tmid) return;
    let scroll: boolean = false;
    // Check if user is already at down of page then scroll to show message
    if(isInViewport(bottomRef.current)){
      scroll = true;
    }

    await addMessage(message);
    if(scroll) scrollToBottom();
    if(props.isThread) await markRoomAsRead(id);
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

    let newMessages: RealtimeAPIMessage[];

    if(props.isThread){
      newMessages = await loadMessagesFromThread(tmid);
    } else {
      const newMessagesResponse: {messages: RealtimeAPIMessage[]} = await loadMessagesFromRoom(id, MESSAGES_LOAD_PER_REQUEST, lastMessageDate);
      newMessages = newMessagesResponse.messages;
    }

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
    if(!props.isThread) loginToRoom();
    else loginToThread();
  }, []);

  return loaded ? (
    <Container >
      {!props.isThread &&
      <HeaderFooterContainer>
        <Header />
      </HeaderFooterContainer>}
      <MessageList messages={messages}
        loadMoreMessages={loadMoreMessages}
        onEditMessageAction={onEditMessageAction}
        setMessageToEdit={setMessageToEdit}
        isThread={props.isThread && tmid}
      >
        <div ref={bottomRef} />
      </MessageList>
      <HeaderFooterContainer>
        <MessageForm messageToEdit={messageToEdit} setMessageToEdit={setMessageToEdit} isThread={props.isThread && tmid} />
      </HeaderFooterContainer>
    </Container>
  ) : null;
}

export default hot(ChatWindow);
