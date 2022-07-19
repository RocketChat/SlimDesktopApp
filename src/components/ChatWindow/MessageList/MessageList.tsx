import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import MessageRow from './MessageRow/MessageRow';
import { RealtimeAPIMessage } from '../../../interfaces/message';
const Container = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
`
const ShowMoreMessages = styled.div`
    width: 100%;
    color: #9ea2a8;
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
    height: 30px;
    cursor: pointer;
    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`


function MessageList(props : any) {

    const messages = props.messages;
    return (
        <Container>
            <ShowMoreMessages onClick={props.loadMoreMessages}>
                Show More Messages
            </ShowMoreMessages>
            {messages ? Object.keys(messages).map((messageId: string) => {
                return (
                    <MessageRow key={messageId} message={messages[messageId]} onEditMessageAction={props.onEditMessageAction} />
                );
            }) : null}
        </Container>
    );
}

export default hot(MessageList);
