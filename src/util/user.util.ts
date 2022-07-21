import sdk from "../sdk";
import { APIResult } from "../interfaces/api";
import { UserResultAPI } from "../interfaces/user";
async function getUserInfo(id: string | undefined) {
    if(!id) return undefined;
    return await sdk.get("users.info", {userId:id});
}

async function getUsernameFromID(id: string | undefined) : Promise<string|undefined> {
    let res: APIResult = await getUserInfo(id);
    if(res.success != true) return;
    let User: UserResultAPI | undefined = res.user;
    if(User == undefined) return;
    return User.username;
}

function getUserID(): string|undefined {
    let userID = sdk.currentLogin?.userId;
    return userID;
}

function getUsername(): string|undefined {
    let username = sdk.currentLogin?.username;
    return username;
}

function isUserLoggedIn(): boolean {
    return sdk.loggedIn();
}

export { getUserInfo, getUsernameFromID, getUserID, getUsername, isUserLoggedIn };
