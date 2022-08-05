import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import MessageRow from "./MessageRow/MessageRow";
import MessageThread from "../MessageThread/MessageThread";
import { useSelector } from "react-redux";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow-x: hidden;
`

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
    flex: 20;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
`
const ShowMoreMessages = styled.div`
    width: 100%;
    color: #9ea2a8;
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
    height: 30px;
    cursor: pointer;
    margin-bottom: 5px;
    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`

const DarkLayer = styled.div`
  ${(props:{addBlackLayer: boolean}) => {
    if(props.addBlackLayer){
      return `
      background-color: rgba(0, 0, 0, .6);
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 999;
      `
    }
  }}
`
function MessageList(props : any) {

    const messages = props.messages;
    const state = useSelector((state: any) => state.thread);

    return (
        <Container>
            <ChatContainer>
                <DarkLayer addBlackLayer={!props.isThread && state.tmid}/>
                <ShowMoreMessages onClick={props.loadMoreMessages}>
                    Show More Messages
                </ShowMoreMessages>
                {messages ? Object.keys(messages).map((messageId: string) => {
                    return (
                        <MessageRow key={messageId} message={messages[messageId]} onEditMessageAction={props.onEditMessageAction} setMessageToEdit={props.setMessageToEdit} />
                    );
                }) : null}
            </ChatContainer>
            {!props.isThread && state.tmid ? <MessageThread /> : null}
        </Container>
    );
}

export default hot(MessageList);
