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
import { handleRoomRead, updateRoomsStatus } from "../../state/actions";
import { getRoomsStatus } from "../../util/subscriptions.util";
import { useDispatch, useSelector } from "react-redux";

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


  const dispatch = useDispatch();

  let topRoomID: string|null = null;

  const navigate = useNavigate();
  const navigateToLogin = () => navigate('/');



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

    await fetchRoomsStatus();
  }

  const fetchRoomsStatus = async () => {
    const fetchedRoomsStatus = await getRoomsStatus();
    dispatch(updateRoomsStatus(fetchedRoomsStatus));
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
        navigateToLogin();
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

        const lmDate2 = newRoomInfo.lm ? (newRoomInfo.lm["$date"] || new Date(newRoomInfo.lm).getTime()) : 0;
        const lmDate1 = prevRooms[topRoomID] ? (prevRooms[topRoomID].lm["$date"] || new Date(prevRooms[topRoomID].lm).getTime()) : 0;

        if(!topRoomID || lmDate1 < lmDate2){
          newRooms[roomChangedId] = {...newRoomInfo};
          delete prevRooms[roomChangedId];
          topRoomID = roomChangedId;
        } else {
          // otherwise, just change the room
          prevRooms[roomChangedId] = {...newRoomInfo,};
        }

        dispatch(handleRoomRead(roomChangedId));

        return { ...newRooms, ...prevRooms }
      });

    });
  }

  const registerSubscriptions = async () => {
    registerUserStatusChangeSubscription();
    subscribeToRoomChanges();
  }

  useEffect(() => {
    loginIfNotAndLoadChats();
  }, []);

  const roomsStatus = useSelector((state: any) => state.unread);
  return (
    <Container>
      { userID ? (<Header />) : (null) }
      <List rooms={rooms} roomsStatus={roomsStatus} />
      <Footer />
    </Container>
  );
}

export default hot(ChatList);
