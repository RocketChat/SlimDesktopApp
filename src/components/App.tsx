import React from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from './Login/Login'
import ChatList from "./ChatsList/ChatList";
import ChatWindow from "./ChatWindow/ChatWindow";
import store from "../state/store";
import "./style.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
          <Route path="/list" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatWindow isThread={false} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default hot(App);
