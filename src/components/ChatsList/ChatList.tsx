import React, { useState, useMemo, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { getListOfRooms, subscribeToRooms, onRoomsChange, getRoomInfo, handleListOfRooms } from "../../util/chatsList.util";
import { getUserID } from "../../util/user.util";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import List from "./List/List";
import styled from "styled-components"
import { Room } from "../../interfaces/room";
import { useNavigate } from 'react-router-dom';
import { realTimeLoginWithAuthToken } from "../../util/login.util";
import { registerUserStatusChangeSubscription } from "../../util/status.util";
import { handleNewNotification, handleRoomRead, updateRoomsStatus } from "../../state/actions";
import { getRoomsStatus } from "../../util/subscriptions.util";
import { useDispatch, useSelector } from "react-redux";
import { spollightWord } from "../../util/spotlight.util";
import SearchInput from "./Header/SearchInput/SearchInput";

const Container = styled.div`
  background-color: #2f343d;
  height:100vh;
  max-width: 500px;
  overflow: hidden;
`

interface RoomsMap {
  [_id: string]: Room
}

const isNewMessage = (lastMessageDate: any, newMessageDate: any) => {
  const firstTime = lastMessageDate ? (lastMessageDate["$date"] || new Date(lastMessageDate).getTime()) : 0;
  const secondTime = newMessageDate ? (newMessageDate["$date"] || new Date(newMessageDate).getTime()) : 0;
  return secondTime > firstTime;
}

function ChatList() {

  const [rooms, setRooms] = useState<RoomsMap>({});
  const [userID, setUserID] = useState<string | undefined>();

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [roomsSearching, setRoomsSearching] = useState<RoomsMap>({});


  const dispatch = useDispatch();

  let topRoomID: string|null = null;

  const navigate = useNavigate();
  const navigateToLogin = () => navigate('/');


  const goSearchWord = async (word: string) => {
    const searchingRooms = await spollightWord(word);

    const mergedRooms = await handleListOfRooms([
      ...searchingRooms.rooms,
      ...searchingRooms.users
    ]);

    setRoomsSearching(() => {
      let newRooms: RoomsMap = {};
      mergedRooms.map((Room) => {
        newRooms[Room._id] = Room;
      });

      newRooms = {...newRooms};
      return newRooms;
    });

  }

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

      let newMessage: boolean = false;
      setRooms((prevRooms) => {
        let newRooms : RoomsMap = {};
        // check if new message, then put the chat on the top of the queue

        if(
          (!topRoomID) ||
          (prevRooms[topRoomID].lm && newRoomInfo.lm &&isNewMessage(prevRooms[topRoomID].lm, newRoomInfo.lm))
        ){
          newRooms[roomChangedId] = {...newRoomInfo};
          delete prevRooms[roomChangedId];
          topRoomID = roomChangedId;
          newMessage = true;
        } else {
          // otherwise, just change the room
          prevRooms[roomChangedId] = {...newRoomInfo};
        }

        return { ...newRooms, ...prevRooms }
      });

      if(newMessage && !(newRoomInfo.lastMessage?.u._id == getUserID())){
        dispatch(handleRoomRead(roomChangedId));
        dispatch(handleNewNotification(newRoomInfo.lastMessage));
      }

    });
  }

  const registerSubscriptions = async () => {
    registerUserStatusChangeSubscription();
    subscribeToRoomChanges();
  }

  useEffect(() => {
    loginIfNotAndLoadChats();
  }, []);

  const roomsStatus = useSelector((state: any) => state.unread && state.unread.rooms);

  return (
    <Container>
      { userID ? (<Header setIsSearching={setIsSearching} />) : (null) }
      { isSearching && <SearchInput goSearchWord={goSearchWord} /> }
      <List rooms={isSearching ? roomsSearching : rooms} roomsStatus={roomsStatus} />
      <Footer />
    </Container>
  );
}

export default hot(ChatList);
