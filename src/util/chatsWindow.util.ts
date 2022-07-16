import { driver } from '@rocket.chat/sdk';
import { RealtimeAPIMessage } from '../interfaces/message';

interface ProcessMessageCallbackk {
    (err:any, message:any, messageOptions:any): void;
}

async function loadMessagesFromRoom(roomId: string | undefined, numberOfMessages: Number, lastMessageRetrievedData: any) : Promise<RealtimeAPIMessage[]> {
    if(!roomId) throw new Error('Room ID Not Found!');
    let res: { messages: RealtimeAPIMessage[] } = await driver.asyncCall("loadHistory", [ roomId, lastMessageRetrievedData, numberOfMessages, null ]);
    let messages: RealtimeAPIMessage[] = res.messages;
    messages.reverse();
    return messages;
}

async function realTimeSubscribeToRoom(roomId: string | undefined, callback: ProcessMessageCallbackk){
    /*
     The SDK is not working properly with single room stream for now
     TODO: Replace with await driver.subscribe("stream-room-messages", roomId || "");
    */
    await driver.subscribeToMessages();
    await driver.reactToMessages( callback );
}


export { loadMessagesFromRoom, realTimeSubscribeToRoom };
