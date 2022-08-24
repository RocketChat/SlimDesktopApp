import { RealtimeAPIMessage } from "../interfaces/message";

function createMessageNotification(message: RealtimeAPIMessage | undefined){
    if(!message || !message.msg || !message.u) return;
    const user = message.u;
    let notification = new Notification("Rocket.Chat", {
        body: `${user.name}: ${message.msg}`
    });
    return notification;
}

export { createMessageNotification };
