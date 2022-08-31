import { RealtimeAPIMessage } from "../interfaces/message";
import sound from "../../assets/sounds/notify.mp3";

function createNotification(body: any){
    let notification = new Notification("Rocket.Chat", body);
    return notification;
}

function createNotifySound(){
    new Audio(sound).play();
}

function createMessageNotification(message: RealtimeAPIMessage | undefined){
    if(!message || !message.msg || !message.u) return;
    const user = message.u;

    createNotifySound();
    createNotification({
        body: `${user.name}: ${message.msg}`
    });

}

export { createMessageNotification };
