import { RealtimeAPIMessage } from "../../interfaces/message";

const reducer = (state = {tmid: null,isOpened: false}, action: {type: string, tmid: string, message: RealtimeAPIMessage}) => {
    switch(action.type){
        case "open":
            return {...state, isOpened: true, tmid: action.tmid, methods:null};
        case "close":
            return {...state, isOpened: false, tmid: null, methods: null};
        default:
            return state;
    }
}

export default reducer;
