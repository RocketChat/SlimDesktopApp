import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components"
import { AiOutlineHome, AiOutlineSearch, AiOutlineGlobal } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { getUsername, getUserID } from "../../../util/user.util";
import ProfileImage from "../../main/ProfileImage/ProfileImage";
import UserDropdown from "./UserDropdown/UserDropdown";
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom:1px solid #FFF;
    padding:8px 0px 8px 15px;
`

const ImageContainer = styled.div`
    flex:9;
    cursor: pointer;
`
const IconsContainer = styled.div`
    flex:5;
    display: flex;
    align-items: end;
    justify-content: flex-end;
`
const Icon = styled.div`
    flex:1;
    margin-left: 3px;
    cursor: pointer;
`

function Header(props: any) {
    const [username, setUsername] = useState<string | undefined>();
    const [ID, setUserID] = useState<string | undefined>();
    const [dropDownShow, setDropDownShow] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    const getUserInfoAfterLoading = async () => {
        setUsername(getUsername());
        setUserID(getUserID());
        setLoaded(true);
    }

    const toggleDropdown = () => {
        setDropDownShow(!dropDownShow);
    }

    const goToSearchBar = () => {
        props.setIsSearching(true);
    }

    const cancelSearchBar = () => {
        props.setIsSearching(false);
    }

    useEffect(() => {
        getUserInfoAfterLoading();
    }, []);

    return loaded && (
    <Container>
        <ImageContainer onClick={toggleDropdown}>
            <ProfileImage username={username} id={ID} size={"large"} showStatus={true} />
            {dropDownShow && <UserDropdown />}
        </ImageContainer>
        <IconsContainer>

            <Icon onClick={cancelSearchBar}>
                <AiOutlineHome style={{color: '#FFF', fontSize:'18px'}} />
            </Icon>

            <Icon onClick={goToSearchBar}>
                <AiOutlineSearch style={{color: '#FFF', fontSize:'18px'}} />
            </Icon>

            <Icon>
                <AiOutlineGlobal style={{color: '#FFF', fontSize:'18px'}} />
            </Icon>

            <Icon>
                <IoCreateOutline style={{color: '#FFF', fontSize:'18px'}} />
            </Icon>

        </IconsContainer>
    </Container>
    );
}

export default hot(Header);
