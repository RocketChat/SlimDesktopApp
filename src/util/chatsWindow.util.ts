import sdk from "../sdk";
import { RealtimeAPIMessage } from "../interfaces/message";

function markRoomAsRead(roomId: string | undefined) {
	return sdk.methodCall('readMessages', roomId);
};

async function loadMessagesFromRoom(roomId: string | undefined, numberOfMessages: Number, lastMessageRetrievedData: any) : Promise<{messages: RealtimeAPIMessage[], unreadNotLoaded: number}> {
    if(!roomId) throw new Error('Room ID Not Found!');
    const res = await sdk.methodCall("loadHistory", roomId, lastMessageRetrievedData, numberOfMessages, null);
    const messages: RealtimeAPIMessage[] = res.messages;
    messages.reverse();
    return {messages, unreadNotLoaded: res.unreadNotLoaded};
}

async function realTimeSubscribeToRoom(roomId: string, callback: any){
    await sdk.subscribeRoom(roomId);
    return sdk.onStreamData("stream-room-messages", callback);
}


export { loadMessagesFromRoom, realTimeSubscribeToRoom, markRoomAsRead };
