import React, { useState, useMemo, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { getListOfRooms, subscribeToRooms, onRoomsChange, getRoomInfo } from "../../util/chatsList.util";
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

interface RoomsMap {
  [_id: string]: Room
}

function ChatList() {

  const [rooms, setRooms] = useState<RoomsMap>({});
  const [userID, setUserID] = useState<string | undefined>();
  let topRoomID: string|null = null;
  let navigate = useNavigate();

  const getRoomsList = async () => {
    const fetchedRooms: Room[] = await getListOfRooms();
    setRooms((oldRooms) => {
      let newRooms: RoomsMap = {};
      fetchedRooms.map((Room) => {
        newRooms[Room._id] = Room;
        if(topRoomID == null) topRoomID = Room._id;
      });

      newRooms = {...newRooms, ...oldRooms};
      return newRooms;
    });
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


  const subscribeToRoomChanges = async () => {
    await subscribeToRooms();

    onRoomsChange((ddpMessage: any) => {
      const roomChanged: Room = ddpMessage.fields.args[1];
      const roomChangedId: string = roomChanged._id;
      const newRoomInfo = getRoomInfo(roomChanged);

      setRooms((prevRooms) => {
        let newRooms : RoomsMap = {};
        // check if new message, then put the chat on the top of the queue
        if(!topRoomID || prevRooms[topRoomID].lm["$date"] < newRoomInfo.lm["$date"]){
          newRooms[roomChangedId] = newRoomInfo;
          delete prevRooms[roomChangedId];
          topRoomID = roomChangedId;
        } else {
          // otherwise, just change the room
          prevRooms[roomChangedId] = newRoomInfo;
        }
        return { ...newRooms, ...prevRooms }
      });

    });
  }

  const registerSubscriptions = async () => {
    registerUserStatusChangeSubscription();
    subscribeToRoomChanges();
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
