import { driver } from '@rocket.chat/sdk';
import { RealtimeAPIMessage } from '../interfaces/message';

async function loadMessagesFromRoom(roomId: string | undefined, numberOfMessages: Number, lastMessageRetrievedData: any) : Promise<RealtimeAPIMessage[]> {
    if(!roomId) throw new Error('Room ID Not Found!');
    let res: { messages: RealtimeAPIMessage[] } = await driver.asyncCall("loadHistory", [ roomId, lastMessageRetrievedData, numberOfMessages, null ]);
    let messages: RealtimeAPIMessage[] = res.messages;
    messages.reverse();
    return messages;
}


export { loadMessagesFromRoom };
