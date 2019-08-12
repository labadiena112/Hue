import { SET_USERNAME_AND_URL, GET_GROUPS, GET_LIGHTS, GET_SCENES } from "../actionTypes" //actions types constants we defined in our actions

let dataState = { username: null, url: null, lights: {}, groups: {}, scenes: {} };

const hueApiReducer = (state = dataState, action) => {
    switch (action.type) {
        case SET_USERNAME_AND_URL:
            return {
                ...state,
                username: action.username || dataState.username,
                url: action.url || dataState.url
            };
        case GET_LIGHTS:
            return {
                ...state,
                lights: action.lights || initialData.lights
            };
        case GET_GROUPS:
            return {
                ...state,
                groups: action.groups || initialData.groups
            };
        case GET_SCENES:
            return {
                ...state,
                scenes: action.scenes || initialData.scenes
            };
        default:
            return state;
    }
};

export default hueApiReducer;