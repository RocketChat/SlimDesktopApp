import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { Room } from "../../../interfaces/room";
import { isRoomDM } from "../../../util/chatsList.util";
import ProfileImage from "../../main/ProfileImage/ProfileImage";
const { ipcRenderer } = window.require("electron");

const Container = styled.div`
    display: flex;
    align-items: start;
    justify-content: normal;
    flex-direction: ${(props: any) => props.column ? "column" : "row"};
    margin-top:${(props: { marginTop: any; }) => props.marginTop ? props.marginTop : 0};
    width:100%;
    overflow-y: ${(props: { overflowScroll: any; }) => props.overflowScroll ? 'scroll' : 'hidden'};
    overflow-x: hidden;
    height: 80%;
`

const ChatItemContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: normal;
    align-items: start;
    padding-bottom: 5px 2px;
    padding-left: 8px;
    margin-bottom: 5px;
    cursor: pointer;
    ${(props:{isOpened: boolean | null}) => props.isOpened ? `background-color:rgba(17, 12, 12, 0.5);` : ``}
    &:hover {
        background-color:rgba(17, 12, 12, 0.5);
    }
`


interface OpenedRooms {
    [roomId: string]: boolean
}

function List(props: any) {
    const [openedRooms, setOpenedRooms] = useState<OpenedRooms | null>({});

    const toggleRoom = (roomId: string, isOpening :boolean) => {
        if(isOpening && openedRooms && openedRooms[roomId]) return;
        const oldRooms = {...openedRooms};
        setOpenedRooms(null);
        setOpenedRooms((_) => {
            let rooms = {...oldRooms};
            if(rooms[roomId]) rooms[roomId] = false;
            else rooms[roomId] = true;
            return rooms;
        });
    }

    ipcRenderer.on('windowClosed', (event, message) => {
        toggleRoom(message.roomId, false);
    });

    let rooms: any = props.rooms;
    return (
        <Container column marginTop="10px" overflowScroll>
            {rooms ? Object.keys(rooms).map((roomId: string) => {
                const room = rooms[roomId];
                return (
                    <ChatItem key={roomId} lastMessageDate={room.lastMessageDate} _id={room._id} name={room.name} lastMessage={room.lastMessage} avatarLink={room.avatarLink} isOpened={openedRooms && openedRooms[room._id]} onOpenRoom={toggleRoom} />
                );
            }) : null}
        </Container>
    );
}

function ChatItem(props: Room & {isOpened: boolean | null} & {onOpenRoom: ((roomId: string, isOpening: boolean) => void)}) {

    const openChatWindow = () => {
        props.onOpenRoom(props._id, true);
        ipcRenderer.send("create-window-chat", {
            _id: props._id,
            name: props.name,
            avatarLink: props.avatarLink
        });
    }

    return (
        <ChatItemContainer onClick={openChatWindow} isOpened={props.isOpened}>
            <div style={{flex: 1}}>
                <ProfileImage username={props.avatarLink} id={props._id} size="large" showStatus={isRoomDM(props)}  />
            </div>
            <div style={{flex:12}}>
                <Container column>
                    <div style={{flex:1, display:'flex', flexDirection:'row'}}>
                        <div style={{fontSize:'14px', color:'#FFF'}}>
                            {props.name && props.name}
                        </div>
                        {/*<div style={{position:'relative', left:'250px', fontSize:'12px', color:'#9EA2A8'}}>
                            {props.lastMessageDate ? props.lastMessageDate : ""}
                        </div>*/}
                    </div>
                    <div style={{fontSize:'14px', color:'#FFF', whiteSpace:"nowrap", overflow: "hidden", textOverflow:"ellipsis", display:"inherit"}}>
                        {props.lastMessage && props.lastMessage.u && props.lastMessage.u.name ? props.lastMessage.u.name + ": " : "No Messages Yet"}
                        {props.lastMessage ? props.lastMessage.msg : ""}
                    </div>
                </Container>
            </div>
        </ChatItemContainer>
    );
}

export default hot(List);
