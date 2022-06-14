import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login/Login'
import ChatList from "./ChatsList/ChatList";
import "./style.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/main_window' element={<Login/>}/>
          <Route path="/list" element={<ChatList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default hot(App);
