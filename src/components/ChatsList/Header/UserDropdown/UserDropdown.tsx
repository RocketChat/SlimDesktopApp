import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../../util/login.util";

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
`

const ActionsUl = styled.ul`
    list-style-type: none;
    padding: 5px;
`

const ActionsLi = styled.li`
    padding: 2px;
    &:hover {
        background-color:rgba(186, 186, 186, 0.1);
    }
`

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
                    <ActionsLi onClick={logoutUser}>Logout</ActionsLi>
                </ActionsUl>
            </ActionsModal>
        </Container>
    );
}

export default hot(UserDropdown);
