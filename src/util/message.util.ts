import sdk from "../sdk";
import { RealtimeAPIMessage } from "../interfaces/message";

async function sendTextMessage(roomId: string | undefined, messageText: string) : Promise<boolean> {
    if(!roomId) throw new Error('Room ID Not Found!');
    let res: any = await sdk.post("chat.sendMessage", {
        message:{
            rid: roomId,
            msg: messageText
        }
    });
    return res.success ? true : false;
}

async function deleteMessageById(messageId: string, roomId: string) {
    await sdk.post("chat.delete", {
        msgId: messageId,
        roomId
    });
}

async function editTextMessage(message: RealtimeAPIMessage, newMessageText: string) : Promise<boolean> {
    let newMessage: RealtimeAPIMessage = message;
    await sdk.post("chat.update", {
        roomId: newMessage.rid,
        msgId: newMessage._id,
        text: newMessageText
    });
    return true;
}

export { sendTextMessage, deleteMessageById, editTextMessage };
