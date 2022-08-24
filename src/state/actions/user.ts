import { UserStatus } from "../../interfaces/user";

const updateUserpresence = (userStatus: UserStatus) => {
    return (dispatch: any) => {
        dispatch({
            type: "updatePresence",
            payload: {userStatus}
        });
    }
}

export { updateUserpresence };
