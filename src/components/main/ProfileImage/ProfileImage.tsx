import React from 'react';
import styled from "styled-components";
import { getRoomAvatar } from "../../../util/chatsList.util";

const ProfileImageTag = styled.img`
    border-radius:15%;
    margin-right: 3px;
    height: ${(props: { size: string; }) => props.size == "large" ? "31px" : "18px"};
    width: ${(props: { size: string; }) => props.size == "large" ? "31px" : "18px"};
`


const ProfileImage = (props: any) => {
    const username = props.username;
    return (
        <ProfileImageTag src={getRoomAvatar("/" + username)} size={props.size} />
    );
}

export default ProfileImage;
