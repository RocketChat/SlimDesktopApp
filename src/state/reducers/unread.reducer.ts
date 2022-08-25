interface RoomsStatusMap {
    [_id: string]: any
}

const reducer = (state: {count:Number, rooms:RoomsStatusMap} | null = null, action: {type: string, room: any, payload: any}) => {
    switch(action.type){
        case "update":
            state = {count:0, rooms:{...action.payload}};
            return {...state};
        case "read":
            if(state && state.rooms[action.room.rid]) state.rooms[action.room.rid].alert = false, state.rooms[action.room.rid].unread = 0;
            return {...state};
        case "unread":
            if(state && state.rooms[action.room.rid]) state.rooms[action.room.rid].alert = true, state.rooms[action.room.rid].unread ++;
            return {...state};
        default:
            return state;
    }
}

export default reducer;
