import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../../util/login.util";
import { setUserStatus } from "../../../../util/status.util";
import { UserStatus } from "../../../../interfaces/user";
import Status from "../../../main/ProfileImage/Status";

const Container = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 100;
`

const ActionsModal = styled.div`
    position: fixed;
    left: 15px;
    margin-top: 15px;
    background-color: #FFF;
    border: 1px solid #eeeff1;
    z-index: 100;
    width: 200px;
    padding: 0.5rem 1rem 0.25rem;
    padding-block-end: 0.25rem;
    padding-block-start: 0.5rem;
    padding-inline: 1rem;
`

const ActionsUl = styled.ul`
    list-style-type: none;
    padding: 5px;
    margin: 0;
`

const ActionsLi = styled.li`
    padding: 5px 2px;

    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`

const StatusHeadLine = styled.div`
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1rem;
`

const DividerLine = styled.hr`
    padding: 0;
    margin: 5px 0;
`

const StatusText = styled.span`
    margin-left: 4px;
    font-size: 12px;
`

function SetStatusBar(){
    const setStatus = (status: UserStatus) => setUserStatus(status);
    return (
        <span>
            <StatusHeadLine>Status</StatusHeadLine>
            {Object.keys(UserStatus).filter((v) => !isNaN(Number(v))).map((status, idx) =>{
                return (
                    <ActionsLi onClick={() => setStatus(idx)}>
                        <Status userStatus={idx} />
                        <StatusText>{UserStatus[idx]}</StatusText>
                    </ActionsLi>
                );
            })}
        </span>
    );
}

function UserDropdown() {
    const navigate = useNavigate();
    const navigateToLogin = () => navigate('/');

    const logoutUser = () => {
        logout();
        navigateToLogin();
    }

    return (
        <Container>
            <ActionsModal>
                <ActionsUl style={{listStyleType:"none"}}>
                    <SetStatusBar />
                    <DividerLine />
                    <ActionsLi onClick={logoutUser}>Logout</ActionsLi>
                </ActionsUl>
            </ActionsModal>
        </Container>
    );
}

export default hot(UserDropdown);
