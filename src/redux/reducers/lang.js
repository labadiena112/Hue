import { GET_LANG } from "../actionTypes" //actions types constants we defined in our actions

let dataState = { lang: {}, locale: "lt" };

const langReducer = (state = dataState, action) => {
    switch (action.type) {
        case GET_LANG:
            return {
                ...state,
                locale: action.locale || dataState.locale,
                lang: action.lang || dataState.lang
            };
        default:
            return state;
    }
};

export default langReducer;