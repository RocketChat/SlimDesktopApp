import React, { useState, useEffect, MouseEvent } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { RealtimeAPIMessage } from "../../../../interfaces/message";
import { getRoomAvatar } from "../../../../util/chatsList.util";
import MessageBodyRender from "./components/MessageBodyRender";
import MessageActions from "./components/MessageActions/MessageActions";
import { deleteMessageById } from "../../../../util/message.util";
const MessageContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: normal;
    align-items: start;
    padding: 10px 10px;
    cursor: pointer;
    margin: 0 5px 0 5px;
    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`

const ProfileImage = styled.img`
    height:31px;
    width:31px;
    border-radius:15%;
    margin-right: 3px;
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
    const message: RealtimeAPIMessage = props.message;
    const messageDate = new Date(message.ts["$date"]);

    const editMessage = () => {
        props.onEditMessageAction(message);
    }

    const deleteMessage = async () => {
        await deleteMessageById(message._id);
    }

    const showActionsModal = () => {
        setActionsModal(true);
    }

    const hideActionsModal = () => {
        setActionsModal(false);
    }

    return (
        <MessageContainer onMouseEnter={showActionsModal} onMouseLeave={hideActionsModal}>
            <ProfileImage src={getRoomAvatar("/" + message.u.username)}/>
            <BodyContainer>
                <MessageInfo>
                    <div style={{color: "#2f343d", fontWeight:"bold", fontSize:"14px"}}>{message.u.name}</div>
                    <div style={{color: "#9ea2a8", fontSize:"13px", marginLeft:'4px'}}>{message.u.username}</div>
                    <div style={{color: "#9ea2a8", fontSize:"12px", marginLeft:'4px'}}>{messageDate.getHours() + ":" + messageDate.getMinutes()}</div>
                    <MessageActions
                        onMessageDelete = {deleteMessage}
                        onMessageEdit = {editMessage}
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
            </BodyContainer>
        </MessageContainer>

);
}

export default hot(MessageRow);
