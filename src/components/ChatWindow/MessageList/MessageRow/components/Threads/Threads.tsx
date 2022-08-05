import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { RiWechatLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RealtimeAPIMessage } from "../../../../../../interfaces/message";
import { useSelector, useDispatch } from "react-redux";
import { openThread, closeThread } from "../../../../../../state/actions";

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const ItemContainer = styled.div`
    margin: 5px;
`

const Label = styled.span`
    color: rgb(158, 162, 168);
    font-size: 13px;
    margin-left: 2px;
`

const ReplyButton = styled.button`
    background-color: #156ff5;
    border: 2px solid #156ff5;
    border-radius: 2px;
    color: #FFF;
    &:hover {
        background-color: #0045ab;
        border-color: #0045ab;
    }
`

function MessageThread(props: {message: RealtimeAPIMessage}) {

    const id = props.message._id;
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.thread);
    const openThreadClick = () => {
        if(state.isOpened){
            dispatch(closeThread());
        }
        setTimeout(() => dispatch(openThread(id)), 50);
    }

    const date = new Date(props.message.tlm["$date"])
    return (
        <Container>

            <ItemContainer>
                <ReplyButton onClick={openThreadClick}>Reply</ReplyButton>
            </ItemContainer>

            <ItemContainer>
                <RiWechatLine color="rgb(158, 162, 168)" fontSize={"13px"} />
                <Label>{props.message.tcount}</Label>
            </ItemContainer>

            <ItemContainer>
                <BsPerson color="rgb(158, 162, 168)" fontSize={"13px"} />
                <Label>{props.message.replies?.length}</Label>
            </ItemContainer>

            <ItemContainer>
                <BiTimeFive color="rgb(158, 162, 168)" fontSize={"13px"} />
                <Label>{date.getHours() + ":" + date.getMinutes()}</Label>
            </ItemContainer>

        </Container>
    );
}

export default hot(MessageThread);
