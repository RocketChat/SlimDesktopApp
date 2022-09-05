import RocketChat from "../sdk";
import { RealtimeAPIMessage } from "../interfaces/message";
import { MESSAGES_LOAD_PER_REQUEST } from "../constants";

const filterThreadMessages = (messages: RealtimeAPIMessage[]) => messages.filter((message) => !message.tmid);

function markRoomAsRead(roomId: string | undefined) {
	return RocketChat.sdk.methodCall('readMessages', roomId);
};

async function loadMessagesFromRoom(roomId: string | undefined, numberOfMessages: number, lastMessageRetrievedData: any): Promise<{messages: RealtimeAPIMessage[]}> {
    if(!roomId) throw new Error('Room ID Not Found!');
    const res = await RocketChat.sdk.methodCall("loadHistory", roomId, lastMessageRetrievedData, numberOfMessages, null);
    const messages: RealtimeAPIMessage[] = res.messages;
    const filteredMessages = filterThreadMessages(messages);
    filteredMessages.reverse();

    // If No filtered messages (Non-thread Messages), try fetch me
    if(messages.length && !filteredMessages.length){
        return await loadMessagesFromRoom(roomId, numberOfMessages + MESSAGES_LOAD_PER_REQUEST, lastMessageRetrievedData);
    }

    return {messages: filteredMessages};
}

async function realTimeSubscribeToRoom(roomId: string, callback: any){
    await RocketChat.sdk.subscribeRoom(roomId);
    return RocketChat.sdk.onStreamData("stream-room-messages", callback);
}

async function loadMessagesFromThread(threadId: string | undefined): Promise<RealtimeAPIMessage[]> {
    if(!threadId) throw new Error('Thread ID Not Found!');
    const res = await RocketChat.sdk.methodCall("getThreadMessages", {tmid: threadId});
    const messageThread: RealtimeAPIMessage = res[0];
    res.push(messageThread);
    return res.reverse(); // make the thread message comes first (not last)
}

async function createDMWithUsername(username: string | undefined){
    return await RocketChat.sdk.methodCall('createDirectMessage', username?.toLowerCase());
}

async function joinRoomWithID(roomId: string){
    return await RocketChat.sdk.methodCall('joinRoom', roomId);
}

export {
    loadMessagesFromRoom,
    realTimeSubscribeToRoom,
    markRoomAsRead,
    loadMessagesFromThread,
    createDMWithUsername,
    joinRoomWithID
};
