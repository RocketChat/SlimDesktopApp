import { api } from '@rocket.chat/sdk';
import { getUsernameFromID, getUserID } from './user.util';
import { Room } from '../interfaces/room';

async function getListOfRooms() : Promise<Room[]> {
    let res:any = await api.get('rooms.get');
    let rooms:Room[] = res.update;

    let userID: string|undefined = getUserID();
    let username: string|undefined = await getUsernameFromID(userID);
    // TODO:: Replace by | when the SDK is fixed
    //let username: string = api.currentLogin?.username;

    rooms = rooms.filter((room: Room) => {
        return room.lm != undefined
    });

    rooms.sort((first: any, second:any) => {
        return (new Date(first.lm) < new Date(second.lm)) ? 1 : -1;
    });

    let newRooms: Room[] = rooms.map((room: Room) => {

        let newRoom:Room = {
            _id: room._id,
            name: room.fname || room.name,
            lastMessage: room.lastMessage,
            lastMessageDate: room.lm,
            avatarLink: "/room/" + room._id,
        }

        if(!newRoom.name && room.usernames){
            // check if current user, return the other
            if(username == room.usernames[1]){
                newRoom.name = room.usernames[0];
                newRoom.avatarLink =  "/" + room.usernames[0];
            } else {
                newRoom.name = room.usernames[1];
                newRoom.avatarLink =  "/" + room.usernames[1];
            }
        }

        return newRoom;

    });


    return newRooms;
}

function getRoomAvatar(avatarLink: string | undefined | null) : string {
    return process.env.ROCKETCHAT_URL + "avatar" + avatarLink;
}

export { getListOfRooms, getRoomAvatar };
