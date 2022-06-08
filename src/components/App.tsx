import React from "react";
import { hot } from "react-hot-loader/root";
import { loginWithPassword } from "../util/login.util";

import "./style.css";

function App() {
  loginWithPassword();
  return (
    <div>
      <h3>Rocket.Chat Standalone Desktop Application</h3>
    </div>
  );
}

export default hot(App);
