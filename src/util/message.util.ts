import { driver } from '@rocket.chat/sdk';
import { RealtimeAPIMessage } from '../interfaces/message';

async function sendTextMessage(roomId: string | undefined, messageText: string) : Promise<boolean> {
    if(!roomId) throw new Error('Room ID Not Found!');
    let res: RealtimeAPIMessage = await driver.asyncCall("sendMessage", [{
        rid: roomId,
        msg: messageText
    }]);
    return res._id ? true : false;
}

async function deleteMessageById(messageId: string) {
    await driver.asyncCall("deleteMessage", [{
        _id: messageId
    }]);
}

async function editTextMessage(message: RealtimeAPIMessage, newMessageText: string) : Promise<boolean> {
    let newMessage: RealtimeAPIMessage = message;
    newMessage.msg = newMessageText;
    await driver.asyncCall("updateMessage", [newMessage]);
    return true;
}

export { sendTextMessage, deleteMessageById, editTextMessage };
