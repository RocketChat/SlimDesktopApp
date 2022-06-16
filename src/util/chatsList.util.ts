import { api } from '@rocket.chat/sdk';
import { getUsernameFromID } from './user.util';
import Room from '../interfaces/room';
async function getListOfRooms(){
    let res:JSON = await api.get('rooms.get');
    let rooms = res.update;

    rooms = rooms.filter((room: Room) => {
        return room.lm != undefined
    });

    rooms.sort((first: any, second:any) => {
        return (new Date(first.lm) < new Date(second.lm)) ? 1 : -1;
    });

    rooms = rooms.map((room: Room) => {

        let newRoom:Room = {
            id: room._id,
            name: room.fname || room.name,
            lastMessage: room.lastMessage,
            lastMessageDate: room.lm,
            avatarLink: "/room/" + room._id,
        }

        if(!newRoom.name && room.usernames){
            // check if current user, return the other
            let userID: string = api.currentLogin?.userId;
            let username: string = getUsernameFromID(userID);

            // TODO:: Replace by | when the SDK is fixed
            //let username: string = api.currentLogin?.username;

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


    return rooms;
}


export { getListOfRooms };
