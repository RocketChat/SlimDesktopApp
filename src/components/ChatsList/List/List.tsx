import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"

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



function List(props: JSON) {
    let rooms: any = props.rooms;
    return (
        <Container column marginTop="10px" overflowScroll>
            {rooms != null ? rooms.map((room: any) => (
            <ChatItem key={room.id} lastMessageDate={room.lastMessageDate} roomId={room.id} name={room.name} message={room.lastMessage} avatarLink={room.avatarLink} />
            )):null}
        </Container>
    );
}

function ChatItem(props: JSON) {
    return (
        <ChatItemContainer>
            <div style={{flex: 1}}>
                <ProfileImage
                    src={process.env.ROCKETCHAT_URL + "avatar" + props.avatarLink} // TODO:: Check the forward slash before /avatar exist
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
                    {props.message ? props.message.u.name + ": " : "No Messages Yet"}
                    {props.message ? props.message.msg : ""}
                </div>
            </Container></div>
        </ChatItemContainer>
    );
}

export default hot(List);
