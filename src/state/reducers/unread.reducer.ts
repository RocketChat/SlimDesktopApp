interface RoomsStatusMap {
    [_id: string]: any
}

const reducer = (state: {count:number, rooms:RoomsStatusMap} | null = null, action: {type: string, room: any, payload: any}) => {
    switch(action.type){
        case "update":
            state = {count:0, rooms:{...action.payload}};
            for(let roomId in state.rooms) if(state.rooms[roomId].unread) state.count++;
            return {...state};
        case "read":
            if(state && state.rooms[action.room.rid]) {
                state.rooms[action.room.rid].alert = false, state.rooms[action.room.rid].unread = 0;
                state.count = 0;
                for(let roomId in state?.rooms) if(state?.rooms[roomId].unread) state.count++;
            }

            return {...state};
        case "unread":
            if(state && state.rooms[action.room.rid]) {
                state.rooms[action.room.rid].alert = true, state.rooms[action.room.rid].unread ++;
                state.count = 0;
                for(let roomId in state?.rooms) if(state?.rooms[roomId].unread) state.count++;
            }
            return {...state};
        default:
            return state;
    }
}

export default reducer;
