const openRoom = (roomId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: "openRoom",
            id: roomId
        });
    }
}

const closeRoom = (roomId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: "closeRoom",
            id: roomId
        });
    }
}



export { openRoom, closeRoom };
