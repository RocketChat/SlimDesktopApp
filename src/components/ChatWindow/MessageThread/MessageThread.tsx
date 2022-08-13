import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import ChatWindow from "../ChatWindow";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeThread } from "../../../state/actions";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border-left: 1px solid #000
    position: fixed;
    right: 0;
    position: fixed;
    width: 100%;
    height: 90%;
    z-index: 999;
    background-color: white;
`


const HeaderStyled = styled.div`
    width:100%;
    position:absolute;
    display: flex;
    justify-content: center;
    border-bottom:1px solid #eeeff1;
    padding:8px 0px 8px 15px;
    height:1.5rem;
    background-color: #FFF;
    z-index: 1000;
`

const RoomName = styled.div`
    flex:15;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0rem;
    line-height: 2rem;
    height: 15px;
    position: relative;
`

const Icons = styled.div``

const CloseIcon = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 1.5rem;
    text-align: center;
    padding: 6px;
    margin-right: 2px;
    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`




function Header() {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.thread);
    const closeThreadClick = () => {
        if(state.isOpened){
            dispatch(closeThread());
        }
    }

    return (
    <HeaderStyled>
        <Icons>
            <CloseIcon onClick={closeThreadClick}><IoReturnDownBackSharp fontSize={"13px"} /></CloseIcon>
        </Icons>
        <RoomName>Thread</RoomName>
    </HeaderStyled>
    );
}


function MessageThread() {
    return (
        <Container>
            <Header />
            <ChatWindow isThread={true} />
        </Container>
    );
}

export default hot(MessageThread);
