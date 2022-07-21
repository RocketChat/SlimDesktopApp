import sdk from "../sdk";
import { RealtimeAPIMessage } from "../interfaces/message";

async function loadMessagesFromRoom(roomId: string | undefined, numberOfMessages: Number, lastMessageRetrievedData: any) : Promise<RealtimeAPIMessage[]> {
    if(!roomId) throw new Error('Room ID Not Found!');
    const res = await sdk.methodCall("loadHistory", roomId, lastMessageRetrievedData, numberOfMessages, null);
    const messages: RealtimeAPIMessage[] = res.messages;
    messages.reverse();
    return messages;
}

async function realTimeSubscribeToRoom(roomId: string, callback: any){
    await sdk.subscribeRoom(roomId);
    return sdk.onStreamData("stream-room-messages", callback);
}


export { loadMessagesFromRoom, realTimeSubscribeToRoom };
