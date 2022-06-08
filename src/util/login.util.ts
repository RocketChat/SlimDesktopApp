import { api } from '@rocket.chat/sdk';

async function loginWithPassword(){
    const email: string = process.env.REACT_APP_EMAIL || "";
    const password:string = process.env.REACT_APP_PASSWORD || "";
    await api.login({email, password});

}


export { loginWithPassword };
