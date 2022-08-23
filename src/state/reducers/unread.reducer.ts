interface RoomsStatusMap {
    [_id: string]: any
}

const reducer = (state: RoomsStatusMap | null = null, action: {type: string, room: any, payload: any}) => {
    switch(action.type){
        case "update":
            state = {...action.payload};
            return {...state};
        case "read":
            if(state && state[action.room.rid]) state[action.room.rid].alert = false, state[action.room.rid].unread = 0;
            return {...state};
        case "unread":
            if(state && state[action.room.rid]) state[action.room.rid].alert = true, state[action.room.rid].unread ++;
            return {...state};
        default:
            return state;
    }
}

export default reducer;
