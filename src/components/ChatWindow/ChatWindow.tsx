import { api, driver } from "@rocket.chat/sdk";
import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { useParams } from "react-router-dom";
import { loginWithPassword } from "../../util/login.util";
import Header from './Header/Header';
import MessageForm from "./MessageForm/MessageForm";

function ChatWindow() {
  const { id } = useParams();

  const login = async () => {
    await loginWithPassword();
  }

  useEffect(() => {
    login();
  }, []);


  return (
    <div>
        <Header />
        <MessageForm />
    </div>
  );
}

export default hot(ChatWindow);
