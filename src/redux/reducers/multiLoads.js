import { LOAD_DATA } from "../actionTypes" //actions types constants we defined in our actions

let dataState = { dataLoaded: false };

const multiLoadsReducer = (state = dataState, action) => {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                dataLoaded: action.dataLoaded || dataState.dataLoaded
            };
        default:
            return state;
    }
};

export default multiLoadsReducer;