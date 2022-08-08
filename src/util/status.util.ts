import RocketChat from "../sdk";
import { Subscription } from "../interfaces/subscription";

function registerUserStatusChangeSubscription(){
    RocketChat.sdk.subscribe("stream-notify-logged", "user-status");
}

function unRegisterUserStatusChange(subscription: Subscription) {
    RocketChat.sdk.unsubscribe(subscription);
}

async function getUserStatusByUsername(username: string){
    const res = await RocketChat.sdk.get("users.getStatus", {
        username
    });
    return res;
}

export { registerUserStatusChangeSubscription, unRegisterUserStatusChange, getUserStatusByUsername }
