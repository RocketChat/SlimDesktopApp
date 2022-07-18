import { api, driver } from '@rocket.chat/sdk';
import { APIResult } from '../interfaces/api';
import { UserResultAPI } from '../interfaces/user';
async function getUserInfo(id: string | undefined) {
    if(!id) return undefined;
    return await api.get('users.info', {userId:id});
}

async function getUsernameFromID(id: string | undefined) : Promise<string|undefined> {
    let res: APIResult = await getUserInfo(id);
    if(res.success != true) return;
    let User: UserResultAPI | undefined = res.user;
    if(User == undefined) return;
    return User.username;
}

function getUserID(): string|undefined {
    let userID: string|undefined = api.currentLogin?.userId || driver.userId;
    return userID;
}

export { getUserInfo, getUsernameFromID, getUserID };
