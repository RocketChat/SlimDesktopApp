import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { Room } from "../../../interfaces/room";
import { isRoomDM } from "../../../util/chatsList.util";
import ProfileImage from "../../main/ProfileImage/ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { closeRoom, openRoom, readRoom } from "../../../state/actions";

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

const UnreadMessage = styled.p`
    position: relative;
    font-size: 12px;
    text-align: end;
    color: rgb(255 255 255);
    padding: 0px;
    background-color: rgb(0 184 255);
    border-radius: 50%;
    padding: 3px;
    position: absolute;
    right: 20px;
`


function List(props: any) {
    const dispatch = useDispatch();
    const openedRooms = useSelector((state: any) => state.openedWindows);

    const closeRoomFunction = (roomId: string) => {
        dispatch(closeRoom(roomId));
    }

    useEffect(() => {
        ipcRenderer.on('windowClosed', (event, message) => {
            closeRoomFunction(message.roomId);
        });
    }, []);

    const unreadNumberCount = useSelector((state: any) => state.unread && state.unread.count);

    useEffect(() => {
        sendNewUnreadMessagesNumber();
    }, [unreadNumberCount]);

    const sendNewUnreadMessagesNumber = () => {
        ipcRenderer.send("unread-messages-count", unreadNumberCount);
    }

    let rooms: any = props.rooms;
    return (
        <Container column marginTop="10px" overflowScroll>
            {rooms ? Object.keys(rooms).map((roomId: string) => {
                const room = rooms[roomId];
                return (
                    <ChatItem key={roomId} roomsStatus={props.roomsStatus} lastMessageDate={room.lastMessageDate} _id={room._id} name={room.name} lastMessage={room.lastMessage} avatarLink={room.avatarLink} isOpened={openedRooms[room._id]} />
                );
            }) : null}
        </Container>
    );
}

function ChatItem(props: Room & {isOpened: boolean | null} & {roomsStatus: any}) {

    const dispatch = useDispatch();

    const openRoomFunction = (roomId: string) => {
        dispatch(openRoom(roomId));
        dispatch(readRoom(roomId));
    }

    const openChatWindow = () => {
        openRoomFunction(props._id);
        ipcRenderer.send("create-window-chat", {
            _id: props._id,
            name: props.name,
            avatarLink: props.avatarLink
        });
    }

    const rooms = props.roomsStatus;
    const notify = rooms && props._id in rooms && rooms[props._id].alert;
    const unread = rooms && props._id in rooms && rooms[props._id].unread;

    return (
        <ChatItemContainer onClick={openChatWindow} isOpened={props.isOpened}>
            <div style={{flex: 1}}>
                <ProfileImage username={props.avatarLink} id={props._id} size="large" showStatus={isRoomDM(props)}  />
            </div>
            <div style={{flex:12}}>
                <Container column style={{color: `rgba(255, 255, 255, ${notify ? `1` : `0.7`})`}}>
                    <div style={{flex:1, display:'flex', flexDirection:'row'}}>
                        <div style={{fontSize:'14px'}}>
                            {props.name && props.name}
                        </div>
                        {unread != 0 ? <UnreadMessage>{unread}</UnreadMessage> : null}
                    </div>
                    <div style={{fontSize:'14px', whiteSpace:"nowrap", overflow: "hidden", textOverflow:"ellipsis", display:"inherit"}}>
                        {props.lastMessage && props.lastMessage.u && props.lastMessage.u.name ? props.lastMessage.u.name + ": " : "No Messages Yet"}
                        {props.lastMessage ? props.lastMessage.msg : ""}
                    </div>
                </Container>
            </div>
        </ChatItemContainer>
    );
}

export default hot(List);
