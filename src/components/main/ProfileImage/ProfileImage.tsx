import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { getRoomAvatar } from "../../../util/chatsList.util";
import { UserStatus } from "../../../interfaces/user";
import RocketChat from '../../../sdk';
import { getUserID } from '../../../util/user.util';
import { getUserStatusByUsername } from '../../../util/status.util';
import Status from "./Status";

const ProfileImageTag = styled.img`
    border-radius:15%;
    margin-right: 3px;
    height: ${(props: { size: string; }) => props.size == "large" ? "33px" : "18px"};
    width: ${(props: { size: string; }) => props.size == "large" ? "33px" : "18px"};
`



const Container = styled.div`
    height: ${(props: { size: string; }) => props.size == "large" ? "2rem" : "1rem"};
    width: 2.75rem;
`


const ProfileImage = (props: any) => {
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.OFFLINE);

    const parseOnStatusChange = async (ddpMessage: any) => {
        const { eventName } = ddpMessage.fields;
        if (/user-status/.test(eventName)) {
            const userStatus = ddpMessage.fields.args[0];
            const [id, , status] = userStatus;
            const userID = props.id || getUserID();
            if(userID && userID.startsWith(id)){
                let newUserStatus: UserStatus = Number(status);
                setUserStatus(newUserStatus);
            }
        }
    }

    const onUserStatusChange = () => {
        if(!props.showStatus) return;
        RocketChat.sdk.onStreamData("stream-notify-logged", parseOnStatusChange);
    }

    const loadInitialStatus = async () => {
        if(!props.showStatus) return;
        const res = await getUserStatusByUsername(username);
        if(!res.success){
            throw Error('Username is not correct');
        }

        switch(res.status){
            case "busy":
                setUserStatus(UserStatus.BUSY);
                break;
            case "online":
                setUserStatus(UserStatus.ONLINE);
                break;
            case "offline":
                setUserStatus(UserStatus.OFFLINE);
                break;
            case "away":
                setUserStatus(UserStatus.AWAY);
                break;
            default:
                setUserStatus(UserStatus.OFFLINE);
        }
    }

    useEffect(() => {
        onUserStatusChange();
        loadInitialStatus();
    }, []);

    const username = props.username;
    return (
        <Container size={props.size}>
            <ProfileImageTag src={getRoomAvatar("/" + username)} size={props.size} />
            {props.showStatus && <Status profileImage={true} userStatus={userStatus} />}
        </Container>
    );
}

export default ProfileImage;
