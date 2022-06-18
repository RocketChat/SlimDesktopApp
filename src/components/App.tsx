import React, {useEffect} from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login/Login'
import ChatList from "./ChatsList/ChatList";
import ChatWindow from "./ChatWindow/ChatWindow";
import "./style.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
          <Route path="/list" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatWindow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default hot(App);
