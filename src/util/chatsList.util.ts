import RocketChat from "../sdk";
import { getUserID, getUsername } from "./user.util";
import { Room } from "../interfaces/room";
import { getCurrentServer } from "./server.util";

const getRoomInfo = (room: Room): Room => {
    let newRoom:Room = {
        _id: room._id,
        name: room.fname || room.name,
        lastMessage: room.lastMessage,
        lm: room.lm,
        avatarLink: room.username ? room.username : "room/" + room._id,
    }

    const username: string|undefined = getUsername();
    if(!newRoom.name && room.usernames){
        // check if current user, return the other
        if(username == room.usernames[1]){
            newRoom.name = room.usernames[0];
            newRoom.avatarLink = room.usernames[0];
        } else {
            newRoom.name = room.usernames[1];
            newRoom.avatarLink = room.usernames[1];
        }
    } else if(!newRoom.name && room.username){
        newRoom.name = room.username;
    }


    return newRoom;
}

async function handleListOfRooms(rooms: Room[]) : Promise<Room[]> {
    let newRooms: Room[] = rooms.map((room: Room) => {
        let newRoom:Room = getRoomInfo(room);
        return newRoom;
    });

    return newRooms;
}

async function getListOfRooms() : Promise<Room[]> {
    let res:any = await RocketChat.sdk.get('rooms.get');
    let rooms:Room[] = res.update;

    rooms = rooms.filter((room: Room) => {
        return room.lm != undefined
    });

    rooms.sort((first: any, second:any) => {
        return (new Date(first.lm) < new Date(second.lm)) ? 1 : -1;
    });

    let newRooms: Room[] = rooms.map((room: Room) => {
        let newRoom:Room = getRoomInfo(room);
        return newRoom;
    });


    return newRooms;
}

function getRoomAvatar(avatarLink: string | undefined | null) : string {
    return getCurrentServer() + "/avatar" + avatarLink;
}

function isRoomDM(room: Room){
    if(!room.avatarLink) return false;
    return !room.avatarLink.startsWith("room");
}

async function subscribeToRooms() {
    return await RocketChat.sdk.subscribe("stream-notify-user", getUserID() + "/rooms-changed");
}

function onRoomsChange(callback: any){
    RocketChat.sdk.onStreamData("stream-notify-user", (ddpMessage: any) => {
        if(ddpMessage.fields.eventName == getUserID() + "/rooms-changed"){
            callback(ddpMessage);
        }
    });
}

export {
    handleListOfRooms,
    getListOfRooms,
    getRoomAvatar,
    subscribeToRooms,
    onRoomsChange,
    isRoomDM,
    getRoomInfo
};
