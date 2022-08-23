const updateRoomsStatus = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: "update",
            payload
        });
    }
}

const readRoom = (roomId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: "read",
            room: {
                rid: roomId
            }
        });
    }
}

const unreadRoom = (roomId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: "unread",
            room: {
                rid: roomId
            }
        });
    }
}

const handleRoomRead = (roomId: string) => {
    return (dispatch: any, getState: any) => {
        const openedWindows = getState().openedWindows;
        if(openedWindows[roomId]){
            dispatch({
                type: "read",
                room: {
                    rid: roomId
                }
            });
        } else {
            dispatch({
                type: "unread",
                room: {
                    rid: roomId
                }
            });
        }
    }
}

export { updateRoomsStatus, readRoom, unreadRoom, handleRoomRead };
