import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { loginWithPassword, realTimeLoginWithAuthToken } from "../../util/login.util";
import { useNavigate } from 'react-router-dom';

function Login() {

    let navigate = useNavigate();

    const loginHere = async () => {
        try {
            await realTimeLoginWithAuthToken();
        } catch(err) {
            await loginWithPassword();
        }
        await navigate('/list');
    }

    useEffect(() => {
        loginHere();
    }, []);

    return null;
}

export default hot(Login);
