import { api, driver } from '@rocket.chat/sdk';
import { LoginResultAPI, LoginCredentials, LoginResultRealtime } from '../interfaces/login';
import { setAuthToken, getAuthToken } from './authToken.util';
import { cleanURLFromHttp } from './main.util';

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
    const host = process.env.ROCKETCHAT_URL;
    const useSsl = (process.env.ROCKETCHAT_USE_SSL)
    ? ((process.env.ROCKETCHAT_USE_SSL || '').toString().toLowerCase() === 'true')
    : ((host || '').toString().toLowerCase().startsWith('https'));

    await driver.connect({ host: cleanURLFromHttp(host), useSsl});
    const res: LoginResultRealtime = await driver.asyncCall("login", [{ "resume": getAuthToken() }]);

    if(!res.id){
        return new Error('Failed login via Auth Token');
    }

}


export { loginWithPassword, realTimeLoginWithAuthToken };
