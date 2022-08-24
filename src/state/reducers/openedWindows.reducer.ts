interface OpenedWindows {
    [_id: string]: boolean | null
}

const reducer = (state: OpenedWindows | null = null, action: {type: string, id: string}) => {
    switch(action.type){
        case "openRoom":
            if(!state) state = {};
            const v = {...state};
            v[action.id] = true;
            Object.assign(state, v);

            return {...state};
        case "closeRoom":
            if(!state) state = {};
            const v2 = {...state,};
            v2[action.id] = false;
            Object.assign(state, v2);

            return {...state};
        default:
            return state || {};
    }
}

export default reducer;
