import RocketChat from "../sdk";

async function getSupscriptionDetails() {
    const res = await RocketChat.sdk.get("subscriptions.get");
    if(!res.success) return {update: [], remove:[]};
    return res;
}

async function getRoomsStatus(){
    const currentRooms = (await getSupscriptionDetails()).update;
    let res: {[_id: string]: any} = {};
    for(let room of currentRooms){
      res[room.rid] = room;
    }
    return res;
}

export { getSupscriptionDetails, getRoomsStatus };
