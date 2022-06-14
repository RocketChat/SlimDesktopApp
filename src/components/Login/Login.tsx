import React from "react";
import { hot } from "react-hot-loader/root";
import { loginWithPassword } from "../../util/login.util";
import { useNavigate } from 'react-router-dom';

function Login() {

    let navigate = useNavigate();

    const loginHere = async () => {
        await loginWithPassword();
        await navigate('/list');
    }

    return (
        <div>
        <h3>Rocket.Chat Standalone Desktop Application</h3>
        <button onClick={loginHere}>Login Here</button>
        </div>
    );
}

export default hot(Login);
