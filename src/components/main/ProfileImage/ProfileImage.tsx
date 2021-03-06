import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { getRoomAvatar } from "../../../util/chatsList.util";
import { UserStatus } from "../../../interfaces/user";
import sdk from '../../../sdk';
import { getUserID } from '../../../util/user.util';
import { getUserStatusByUsername } from '../../../util/status.util';

const handleStatusTypeColor = (userStatus:UserStatus)  => {
    switch (userStatus) {
      case UserStatus.BUSY:
        return "#ff4b4b"; // Red
    case UserStatus.ONLINE:
        return "#2de0a5"; // Green
    case UserStatus.OFFLINE:
        return "#c1c1c1"; // Light Grey
    case UserStatus.AWAY:
        return "#ffba65"; // Yellow
    default:
        return "#c1c1c1";
    }
};

const ProfileImageTag = styled.img`
    border-radius:15%;
    margin-right: 3px;
    height: ${(props: { size: string; }) => props.size == "large" ? "33px" : "18px"};
    width: ${(props: { size: string; }) => props.size == "large" ? "33px" : "18px"};
`

const Status = styled.span`
    height: 0.75rem;
    width: 0.75rem;
    background-color: ${(props: { userStatus: UserStatus; }) => handleStatusTypeColor(props.userStatus)};
    background-size: contain;
    display: inline-block;
    position: relative;
    bottom: 17.5px;
    left: 23.5px;
    border-radius: 50%;
    border: 1px solid;
`

const Container = styled.div`
    height: ${(props: { size: string; }) => props.size == "large" ? "2rem" : "1rem"};
    width: 2.75rem;
`


const ProfileImage = (props: any) => {
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.ONLINE);

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
        sdk.onStreamData("stream-notify-logged", parseOnStatusChange);
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
            {props.showStatus && <Status userStatus={userStatus} />}
        </Container>
    );
}

export default ProfileImage;
