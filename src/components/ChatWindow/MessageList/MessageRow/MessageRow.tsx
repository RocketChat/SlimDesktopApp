import React, { useState, useEffect, MouseEvent } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { RealtimeAPIMessage } from "../../../../interfaces/message";
import MessageBodyRender from "./components/MessageBodyRender";
import Attachments from "./components/Attachments";
import ParseOtherMessageTypes from "./components/MessageBodyRender/MessageType";
import MessageActions from "./components/MessageActions/MessageActions";
import { deleteMessageById } from "../../../../util/message.util";
import ProfileImage from "../../../main/ProfileImage/ProfileImage";
import MessageThread from "./components/Threads/Threads";

const MessageContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: normal;
    align-items: start;
    padding: 5px 10px;
    cursor: pointer;
    margin: 0 5px 0 5px;
    &:hover {
        background-color: ${(props: { isEditing: boolean; }) => !props.isEditing ? "rgba(186, 186, 186, 0.1)" : "#fff6d6"};
    }
    background-color: ${(props: { isEditing: boolean; }) => !props.isEditing ? "transparent" : "#fff6d6"};
    &:nth-child(3) {
        margin-top: 15px;
    }
`

const BodyContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
`

const MessageInfo = styled.div`
    margin-left: 3px;
    display:flex;
    flex-dirction:row;
`

const MessageBody = styled.div`
    margin-left: 3px;
    display:flex;
    flex-dirction:row;

    > * {
        margin: 0 3px;
    }
`

const onUserMentionClick = (username: string) => (e: MouseEvent<HTMLDivElement>) : void => {
    console.log("Username " + username + " was clicked!");
}

const onChannelMentionClick = (channel: string) => (e: MouseEvent<HTMLDivElement>) : void => {
    console.log("Channel " + channel + " was clicked!");
}


function MessageRow(props : any) {
    const [isShowActionsModal, setActionsModal] = useState(false);
    const [isMessageBeingEdited, setIsEdited] = useState(false);
    const message: RealtimeAPIMessage = props.message;
    const messageDate = new Date(message.ts["$date"]);

    const editMessage = () => {
        setIsEdited(true);
        props.onEditMessageAction(message);
    }

    const deleteMessage = async () => {
        await deleteMessageById(message._id, message.rid);
    }

    const showActionsModal = () => {
        setActionsModal(true);
    }

    const hideActionsModal = () => {
        setActionsModal(false);
    }

    useEffect(() => {
        setIsEdited(false);
    }, [props.message]);

    useEffect(() => {
        const deleteMessageToEditOnESC = (event:any) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setIsEdited(false);
              props.setMessageToEdit(null);
            }
        };

        document.addEventListener('keydown', deleteMessageToEditOnESC);
        return () => document.removeEventListener('keydown', deleteMessageToEditOnESC);
    }, []);

    const messageTime = messageDate.getHours() + ":" + messageDate.getMinutes();
    return (
        <MessageContainer onMouseEnter={showActionsModal} onMouseLeave={hideActionsModal} isEditing={isMessageBeingEdited}>
            <ProfileImage
                username={message.u.username}
                id={message.u._id}
                // if other message type (User joined, ...etc), small profile avatar
                size={message.t ? "small" : "large"}
            />
            {
                message.t ? (
                    <ParseOtherMessageTypes message={message} />
                ) : (
                    <BodyContainer>
                        <MessageInfo>
                            <div style={{color: "#2f343d", fontWeight:"bold", fontSize:"14px"}}>{message.u.name}</div>
                            <div style={{color: "#9ea2a8", fontSize:"13px", marginLeft:'4px'}}>{message.u.username}</div>
                            <div style={{color: "#9ea2a8", fontSize:"12px", marginLeft:'4px'}}>{messageTime}</div>
                            <MessageActions
                                onMessageDelete = {deleteMessage}
                                onMessageEdit = {editMessage}
                                id = {message._id}
                                show={isShowActionsModal}
                            />
                        </MessageInfo>
                        <MessageBody>
                            <MessageBodyRender
                                onUserMentionClick={onUserMentionClick}
                                onChannelMentionClick={onChannelMentionClick}
                                mentions={message?.mentions || []}
                                channels={message?.channels || []}
                                tokens={message.md || []}
                            />
                        </MessageBody>
                        {message.attachments && <Attachments attachments={message.attachments} file={message.file} />}
                        {message.tcount &&  <MessageThread message={message} />}
                    </BodyContainer>
                )
            }
        </MessageContainer>
    );
}

export default hot(MessageRow);
