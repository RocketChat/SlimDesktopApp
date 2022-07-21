import sdk from "../sdk";
import { LoginResultAPI, LoginCredentials } from "../interfaces/login";
import { setAuthToken, getAuthToken } from "./authToken.util";

async function loginWithPassword(){
    const email: string = process.env.REACT_APP_EMAIL || "";
    const password: string = process.env.REACT_APP_PASSWORD || "";
    const user: LoginCredentials = {
        email,
        password
    };
    const result: LoginResultAPI = await sdk.login(user);
    if(result.status == 'success'){
        setAuthToken(result.data.authToken);
    } else {
        return new Error('Failed login via Email and Password');
    }
}

async function realTimeLoginWithAuthToken(){
    const token = getAuthToken() || "";
    const res = await sdk.login({resume: token});
    if(!res.token){
        return new Error('Failed login via Auth Token');
    }
}


export { loginWithPassword, realTimeLoginWithAuthToken };
