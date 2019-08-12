import { OPEN_DATABASE } from "../actionTypes";

let dataState = {
    databaseLoaded: false,
};

const databaseReducer = (state = dataState, action) => {
    switch (action.type) {
        case OPEN_DATABASE:
            return {
                ...state,
                databaseLoaded: action.databaseLoaded
            }
        default:
            return state;
    }
};

export default databaseReducer;