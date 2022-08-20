import RocketChat from "../sdk";
import { Subscription } from "../interfaces/subscription";
import { UserStatus } from "../interfaces/user";

function registerUserStatusChangeSubscription(){
    RocketChat.sdk.subscribe("stream-notify-logged", "user-status");
}

function unRegisterUserStatusChange(subscription: Subscription) {
    RocketChat.sdk.unsubscribe(subscription);
}

async function setUserStatus(status: UserStatus){
    await RocketChat.sdk.methodCall("UserPresence:setDefaultStatus", UserStatus[status].toString().toLowerCase());
}

async function getUserStatusByUsername(username: string){
    const res = await RocketChat.sdk.get("users.getStatus", {
        username
    });
    return res;
}

export { registerUserStatusChangeSubscription, unRegisterUserStatusChange, getUserStatusByUsername, setUserStatus }
