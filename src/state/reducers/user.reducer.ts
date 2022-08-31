import { UserStatus } from "../../interfaces/user";

interface User {
    status: UserStatus
}

const reducer = (state: User = {status: UserStatus.OFFLINE}, action: {type: string, payload: any}) => {
    switch(action.type){
        case "updatePresence":
            const newState = {...state, status: action.payload.userStatus};
            Object.assign(state, newState);
            return state;
        default:
            return state;
    }
}

export default reducer;
