import RocketChat from "../sdk";
import { LoginResultAPI, LoginCredentials } from "../interfaces/login";
import { setAuthToken, getAuthToken, removeAuthToken } from "./authToken.util";
const { ipcRenderer } = window.require("electron");

function connect(host: string, useSSL: boolean){
    try {
        RocketChat.initialize(host, useSSL);
    } catch(err){
        throw err;
    }
}

async function loginWithPassword(host: string, {user, password}: LoginCredentials){

    connect(host, true);

    const userCredentials: LoginCredentials = {
        user,
        password
    };

    try {
        const result: LoginResultAPI = await RocketChat.sdk.login(userCredentials);
        setAuthToken(result.token);
    } catch(err){
        throw Error('Failed login via Email and Password');
    }

}

async function realTimeLoginWithAuthToken(){
    const host = process.env.ROCKETCHAT_URL || "";
    connect(host, true);

    const token = getAuthToken() || "";
    try {
        await RocketChat.sdk.login({resume: token});
    } catch(err){
        removeAuthToken();
        throw Error('Failed login via Auth Token');
    }
}

async function logout(){
    await RocketChat.sdk.logout();
    ipcRenderer.send("close-all-window-chat");
    removeAuthToken();
}

export { loginWithPassword, realTimeLoginWithAuthToken, logout };
