import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { Room } from "../../../interfaces/room";
import { getRoomAvatar } from "../../../util/chatsList.util";
const { ipcRenderer } = window.require("electron");

const Container = styled.div`
    display: flex;
    align-items: start;
    justify-content: normal;
    flex-direction: ${(props: { column: any; }) => props.column ? "column" : "row"};
    margin-top:${(props: { marginTop: any; }) => props.marginTop ? props.marginTop : 0};
    width:100%;
    overflow-y: ${(props: { overflowScroll: any; }) => props.overflowScroll ? 'scroll' : 'hidden'};
    height: 100%;
`

const ChatItemContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: normal;
    align-items: start;
    padding-left: 8px;
    cursor: pointer;
    &:hover {
        background-color:rgba(17, 12, 12, 0.5);
    }
`
const ProfileImage = styled.img`
    height:34px;
    width:34px;
    border-radius:15%;
`



function List(props: any) {
    let rooms: any = props.rooms;
    return (
        <Container column marginTop="10px" overflowScroll>
            {rooms != null ? rooms.map((room: Room) => (
            <ChatItem key={room.id} lastMessageDate={room.lastMessageDate} id={room.id} name={room.name} lastMessage={room.lastMessage} avatarLink={room.avatarLink} />
            )):null}
        </Container>
    );
}

function ChatItem(props: Room) {

    const openChatWindow = () => {
        ipcRenderer.send("create-window-chat", {
            ...props
        });
    }

    return (
        <ChatItemContainer onDoubleClick={openChatWindow}>
            <div style={{flex: 1}}>
                <ProfileImage
                    src={getRoomAvatar(props.avatarLink)} // TODO:: Check the forward slash before /avatar exist
                    style={{margin:'4px'}} />
            </div>
            <div style={{flex:12}}>
            <Container column>
                <div style={{flex:1, display:'flex', flexDirection:'row', marginTop:'6px'}}>
                    <div style={{fontSize:'14px', color:'#FFF'}}>
                        {props.name}
                    </div>
                    {/*<div style={{position:'relative', left:'250px', fontSize:'12px', color:'#9EA2A8'}}>
                        {props.lastMessageDate ? props.lastMessageDate : ""}
                    </div>*/}
                </div>
                <div style={{fontSize:'14px', color:'#FFF', whiteSpace:"nowrap", overflow: "hidden", textOverflow:"ellipsis", display:"inherit"}}>
                    {props.lastMessage ? props.lastMessage.u.name + ": " : "No Messages Yet"}
                    {props.lastMessage ? props.lastMessage.msg : ""}
                </div>
            </Container></div>
        </ChatItemContainer>
    );
}

export default hot(List);
