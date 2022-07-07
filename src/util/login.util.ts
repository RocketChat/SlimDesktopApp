import { api, driver } from '@rocket.chat/sdk';
import { LoginResultAPI, LoginCredentials, LoginResultRealtime } from '../interfaces/login';
import { setAuthToken, getAuthToken } from './authToken.util';

async function loginWithPassword(){
    const email: string = process.env.REACT_APP_EMAIL || "";
    const password: string = process.env.REACT_APP_PASSWORD || "";
    const user: LoginCredentials = {
        email,
        password
    };
    const result: LoginResultAPI = await api.login(user);

    if(result.status == 'success'){
        setAuthToken(result.data.authToken);
    }
}

async function realTimeLoginWithAuthToken(){

    await driver.connect({ host: "open.rocket.chat", useSsl: true});
    const res: LoginResultRealtime = await driver.asyncCall("login", [{ "resume": getAuthToken() }]);

    if(!res.id){
        return new Error('Failed login via Auth Token');
    }

}


export { loginWithPassword, realTimeLoginWithAuthToken };
