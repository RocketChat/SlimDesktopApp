import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { getListOfRooms } from "../../util/chatsList.util";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import List from "./List/List";
import styled from "styled-components"

const Container = styled.div`
    background-color: #2f343d;
    height:100vh;
    max-width: 500px;
    overflow: hidden;
`

function ChatList() {

  const [rooms, setRooms] = useState(null);

  const getRoomsList = async () => {
    setRooms(await getListOfRooms());
  }

  useEffect(() => {
    getRoomsList();
  }, []);

  return (
    <Container>
      <Header />
      <List rooms={rooms} />
      <Footer />
    </Container>
  );
}

export default hot(ChatList);
