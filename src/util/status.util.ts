import sdk from "../sdk";
import { Subscription } from "../interfaces/subscription";

function registerUserStatusChangeSubscription(){
    sdk.subscribe("stream-notify-logged", "user-status");
}

function unRegisterUserStatusChange(subscription: Subscription) {
    sdk.unsubscribe(subscription);
}

async function getUserStatusByUsername(username: string){
    const res = await sdk.get("users.getStatus", {
        username
    });
    return res;
}

export { registerUserStatusChangeSubscription, unRegisterUserStatusChange, getUserStatusByUsername }
