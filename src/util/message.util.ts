import RocketChat from "../sdk";
import { RealtimeAPIMessage } from "../interfaces/message";
import { getUserID } from "./user.util";
import { getAuthToken } from "./authToken.util";
import { getCurrentServer } from "./server.util";

async function sendTextMessage(roomId: string | undefined, messageText: string, threadId: string | null = null) : Promise<boolean> {
    if(!roomId) throw new Error('Room ID Not Found!');
    let message : {rid: string, msg: string, tmid?: string} = {
        rid: roomId,
        msg: messageText,
    }
    if(threadId) message.tmid = threadId;
    let res: any = await RocketChat.sdk.post("chat.sendMessage", {message});
    return res.success ? true : false;
}

async function deleteMessageById(messageId: string, roomId: string) {
    await RocketChat.sdk.post("chat.delete", {
        msgId: messageId,
        roomId
    });
}

async function editTextMessage(message: RealtimeAPIMessage, newMessageText: string) : Promise<boolean> {
    let newMessage: RealtimeAPIMessage = message;
    await RocketChat.sdk.post("chat.update", {
        roomId: newMessage.rid,
        msgId: newMessage._id,
        text: newMessageText
    });
    return true;
}

async function sendFileMessage(rid: string | undefined, formData: FormData){
    if(!rid) return;

    const userId = getUserID();
    const token = getAuthToken();
    const server = getCurrentServer();
    const uploadUrl = `${server}/api/v1/rooms.upload/${rid}`;
    const headers = {
        'X-Auth-Token': token,
        'X-User-Id': userId,
    }

    await fetch(uploadUrl, {
        method: 'POST',
        headers,
        body: formData
    });

    return true;
}

export { sendTextMessage, deleteMessageById, editTextMessage, sendFileMessage };
