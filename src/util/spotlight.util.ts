import RocketChat from "../sdk";
import { getUserID } from "./user.util";

async function spollightWord(word: string){
    const rooms = await RocketChat.sdk.methodCall("spotlight", word, [], {
        "users": true,
        "rooms": true
    });
    for(let id in rooms.users) rooms.users[id]._id += getUserID();
    return rooms;
}


export { spollightWord }
