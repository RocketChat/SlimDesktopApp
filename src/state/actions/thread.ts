const openThread = (tmid: string) => {
    return (dispatch: any) => {
        dispatch({
            type: "open",
            tmid
        });
    }
}

const closeThread = () => {
    return (dispatch: any) => {
        dispatch({
            type: "close",
        });
    }
}

export { openThread, closeThread };
