import React, { useState, useMemo, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { getListOfRooms } from "../../util/chatsList.util";
import { getUserID } from "../../util/user.util";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import List from "./List/List";
import styled from "styled-components"
import { Room } from "../../interfaces/room";
import { useNavigate } from 'react-router-dom';
import { realTimeLoginWithAuthToken } from "../../util/login.util";
import { registerUserStatusChangeSubscription } from "../../util/status.util";

const Container = styled.div`
    background-color: #2f343d;
    height:100vh;
    max-width: 500px;
    overflow: hidden;
`

function ChatList() {

  const [rooms, setRooms] = useState<Room[]>([]);
  const [userID, setUserID] = useState<string | undefined>();
  let navigate = useNavigate();

  const getRoomsList = async () => {
    setRooms(await getListOfRooms());
  }

  const loadRoomsAndRegisterSubscriptions = async () => {
    await registerSubscriptions();
    await getRoomsList();
    setUserID(getUserID());
  }

  const loginIfNotAndLoadChats = async () => {
    if(!getUserID()){
      try {
        await realTimeLoginWithAuthToken();
        await loadRoomsAndRegisterSubscriptions();
      } catch(err){
        navigate('/');
      }
    } else {
      await loadRoomsAndRegisterSubscriptions();
    }
  }

  const registerSubscriptions = async () => {
    registerUserStatusChangeSubscription();
  }

  useMemo(() => {
    loginIfNotAndLoadChats();
  }, []);

  return (
    <Container>
      { userID ? (<Header />) : (null) }
      <List rooms={rooms} />
      <Footer />
    </Container>
  );
}

export default hot(ChatList);
