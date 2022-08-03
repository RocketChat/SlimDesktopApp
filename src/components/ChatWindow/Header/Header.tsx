import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { AiOutlineSearch, AiOutlineGlobal } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProfileImage from "../../main/ProfileImage/ProfileImage";

const Container = styled.div`
    width:100%;
    position:fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom:1px solid #eeeff1;
    padding:8px 0px 8px 15px;
    height:2.5rem;
    overflow-x: hidden;
    background-color: #FFF;
    z-index: 1000;
`

const ImageContainer = styled.div`
    flex:1;
`

const RoomInfoContainer = styled.div`
    flex:10;
    font-weight:bold;
    display: flex;
    flex-direction: row;
`

const IconsContainer = styled.div`
    flex:4;
    display: flex;
    align-items: start;
    justify-content: flex-end;
    margin-right: 10px;
`
const Icon = styled.div`
    margin-right: 12px;
    cursor: pointer;
    padding: 5px;
    transition: 0.3s;
    border-radius: 0.5px;
    &:hover {
        background-color: #dddddd;
    }
`

const RoomName = styled.div`
    flex:15;
    margin-top:5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--rcx-color-foreground-default, #2f343d);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0rem;
    line-height: 1.5rem;
    overflow-x: hidden;
    margin-inline: 0.25rem;
`

function Header() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const username = searchParams.get("name");
    const avatar = searchParams.get("avatar");
    return (
    <Container>
        <RoomInfoContainer>
            <ImageContainer>
                <ProfileImage username={avatar} id={id} size="large" showStatus={!avatar?.startsWith("room")} />
            </ImageContainer>
            <RoomName>
                {username}
            </RoomName>
        </RoomInfoContainer>
        <IconsContainer>
            <Icon><CgProfile style={{color: '#2f343d', fontSize:'22px'}} /></Icon>
            <Icon><AiOutlineSearch style={{color: '#2f343d', fontSize:'22px'}} /></Icon>
            <Icon><AiOutlineGlobal style={{color: '#2f343d', fontSize:'22px'}} /></Icon>
        </IconsContainer>
    </Container>
    );
}

export default hot(Header);
