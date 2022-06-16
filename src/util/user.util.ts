import { api } from '@rocket.chat/sdk';

async function getUserInfo(id: string) {
    return await api.get('users.info', {userId:id});
}

async function getUsernameFromID(id: string){
    let res: JSON = await getUserInfo(id);
    if(res.success != true) return;
    return res.user.username;
}

export { getUserInfo, getUsernameFromID };
